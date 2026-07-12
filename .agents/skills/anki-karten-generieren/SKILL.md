---
name: anki-karten-generieren
description: Generiert aus Buchkapiteln atomare Anki-Karteikarten im Format 'Frage;Antwort' und fügt sie der CSV-Datei hinzu.
---
# Anki-Karten generieren

Dieser Skill beschreibt das Vorgehen, um aus den Kapiteln des Rust-Buchs automatisch atomare Anki-Karteikarten zu generieren und an die CSV-Datei anzuhängen.

## 🎯 Ziel
Extraktion von Kernkonzepten aus den gelesenen oder erstellten Buchkapiteln und deren Speicherung als Frage-Antwort-Paare in der Datei `/home/thorsten/Anfaenger/rust_anki_karten.csv`.

## ⚙️ Regeln für Karteikarten (Atomarität & Formulierung)
1. **Atomarität (Eine Frage, eine Antwort):**
   - Jede Karte darf nur einen einzigen, isolierten Fakt abfragen.
   - Vermeide komplexe Fragen, die mehrere Schritte oder Informationen verlangen.
   - *Negativbeispiel:* "Wie funktioniert Ownership und was sind die drei Regeln?" (Zu lang/komplex).
   - *Positivbeispiel:* "Welcher Speicherbereich wird von Rust standardmäßig für dynamisch wachsende Daten (z. B. `String`) verwendet?" -> `Heap`.

2. **Klarheit und Präzision:**
   - Formulierung von prägnanten Fragen. Die Antwort sollte idealerweise aus einem Wort, einem Satz oder einem kurzen Code-Snippet bestehen.

3. **Formatierung (CSV):**
   - Die Karten müssen im Format `Frage;Antwort` zeilenweise an das Ende der Datei `/home/thorsten/Anfaenger/rust_anki_karten.csv` angehängt werden.
   - **Trennzeichen:** Verwende das Semikolon (`;`) ausschließlich als Trennzeichen zwischen Frage und Antwort. Wenn in der Frage oder Antwort selbst ein Semikolon benötigt wird (z. B. in Rust-Code), formuliere die Karte so um, dass kein Semikolon benötigt wird, oder umschreibe es, um CSV-Parsing-Fehler zu vermeiden.
   - **Zeilenumbrüche:** Jede Karteikarte muss genau eine Zeile in der CSV-Datei belegen. Keine echten Zeilenumbrüche innerhalb von Frage oder Antwort verwenden.

4. **Keine fertigen Programmierlösungen:**
   - **WICHTIG:** Im Buch dürfen keine fertigen Codelösungen vorweggenommen werden. Auch die Karteikarten dürfen keine vollständigen Lösungen für die Übungsaufgaben des Buchs enthalten.
   - Sie sollen stattdessen theoretisches Wissen, Syntaxdetails, Compiler-Verhalten oder Konzepte abfragen.

## 📂 Pfad der Zieldatei
Alle generierten Karteikarten müssen an folgende Datei angehängt werden:
`/home/thorsten/Anfaenger/rust_anki_karten.csv`

## 📋 Vorgehen beim Generieren
1. Lies das entsprechende Kapitel aufmerksam durch.
2. Identifiziere Kernkonzepte, Syntaxdetails oder Regeln des Kapitels.
3. Formuliere für jedes Konzept ein atomares Frage-Antwort-Paar.
4. Öffne die CSV-Datei `/home/thorsten/Anfaenger/rust_anki_karten.csv` und hänge die Zeilen im Format `Frage;Antwort` an das Dateiende an. Falls die Datei noch nicht existiert, erstelle sie neu.
5. Verändere bei diesem Prozess **NICHT** die Datei `/home/thorsten/Anfaenger/rust-projekte/src/SUMMARY.md`.
