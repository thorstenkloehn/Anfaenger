# 🟢 L1 Grundlagen

In diesem Level lernst du die Bausteine, ohne die kein Rust-Programm auskommt. Jedes Projekt kombiniert mehrere Themen gleichzeitig, wie in einem echten Programm.

| Thema | Was du lernst |
|---|---|
| 🧱 Variablen, Datentypen, Kontrollfluss | Zahlen, Texte, Mutabilität, `if/else`, `loop`, `while`, `for` |
| ⌨️ Benutzereingabe & String-Parsing | Konsoleneingabe lesen, `parse()`, Fehler beim Parsen behandeln |
| 🧠 Ownership, Borrowing & Lifetimes-Basics | Wer besitzt was? Referenzen (`&`, `&mut`), einfache Lifetime-Annotationen |
| 🏗️ Structs, Enums, Methoden | Eigene Datentypen, `impl`-Blöcke, z. B. Events mit Severity Level |
| 🔀 Pattern Matching | `match` mit Exhaustiveness Checking, kompaktes `if let` |
| ❓ Error Handling | `Option<T>`, `Result<T, E>`, `?`-Operator |
| 📦 `Vec`, `HashMap`, `String` | Collections befüllen, durchsuchen, verändern |
| 📁 Modulsystem | `mod`, `pub`, `use`, Sichtbarkeit über Dateigrenzen hinweg |

> **Hinweis:** Alle Projekte werden ohne fertige Code-Vorschläge begleitet. Erarbeite die Lösung eigenständig!

---

## 📜 132 Projektvorschläge

### 🧠 Wissenssysteme & Wissenstechnik
1. 📖 **Glossar-Tool (Fachbegriffe nachschlagen)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
2. ❓ **FAQ-Verwaltung (Frage-Antwort-Katalog)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
3. 🎴 **Karteikarten-Trainer (Konsole, Frage/Antwort)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
4. 🧠 **Wissens-Quiz mit Punktestand** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
5. 📚 **Fakten-Datenbank (Kategorien & Suche)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
6. 🏷️ **Tag-basierte Notizverwaltung** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
7. 📓 **Mini-Wiki (Konsole, verlinkte Einträge)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
8. 💬 **Zitate-Sammlung mit Autor-Suche** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
9. 🔤 **Begriffs-Lexikon (alphabetisch sortiert)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
10. 🗂️ **Lernkarten-Stapel-Verwalter (mehrere Stapel)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
11. ❔ **Frage-Antwort-Datenbank mit Bewertung** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
12. 🧩 **Themen-Verknüpfungs-Tool (verwandte Begriffe)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)

### 🧭 Expertensysteme & Expertensystem-Technik
13. 🌳 **Entscheidungsbaum-Berater (Ja/Nein-Fragen)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
14. 🩺 **Diagnose-Quiz (Symptom → Ergebnis)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
15. 📏 **Regelbasierter Ratgeber (Wenn-Dann-Regeln)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
16. 🌱 **Pflanzenpflege-Berater (Regelbasiert)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
17. 🚗 **Kfz-Fehlerdiagnose-Tool (einfach)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
18. 🥗 **Ernährungsberater (Regelbasiert)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
19. 🧥 **Wetter-Kleidungsberater** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
20. 💳 **Kredit-Ampel-Berater (Regeln)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
21. 🐾 **Tier-Bestimmungs-Tool (Ja/Nein-Fragen)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
22. 🍲 **Rezept-Empfehlungs-Tool (Zutaten → Vorschlag)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
23. 🧯 **Fehlerbaum-Navigator (Konsole)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
24. 🎯 **Ziel-Empfehlungs-Berater (Regelpriorität)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)

### 🎓 LMS & Lernplattform-Technik
25. 📚 **Kursverwaltung (Konsole)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
26. 📝 **Teilnehmer-Anmeldesystem** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
27. ❓ **Quiz-Tool mit Auswertung** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
28. ✅ **Fortschritts-Tracker (Lektionen abhaken)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
29. 🎓 **Notenbuch für Kurse** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
30. 🗺️ **Lernpfad-Planer (Reihenfolge von Lektionen)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
31. 🙋 **Anwesenheits-Tracker** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
32. 🏅 **Zertifikat-Generator (Text)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
33. 📤 **Hausaufgaben-Abgabe-Tracker** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
34. ⭐ **Kursbewertungs-Tool (Sterne & Feedback)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
35. 🎯 **Lernziel-Checkliste** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
36. 🗓️ **Stundenplan-Verwaltung** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)

### 🤖 Eigener KI-Agent & Agenten-Technik
37. 💬 **Einfacher Regel-Chatbot (Konsole)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
38. ⌨️ **Kommando-Interpreter (Text-Befehle parsen)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
39. 🔀 **Zustands-basierter Dialog-Agent (einfache Zustandsmaschine)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
40. 🧰 **Simple Tool-Auswahl (Menü-basiert)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
41. 🎮 **Text-Adventure-Agent (NPC-Antworten)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
42. 📝 **Erinnerungs-Notiz-Agent (einfacher Speicher)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
43. 📋 **Aufgaben-Planer-Agent (To-Do aus Eingabe ableiten)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
44. 🔍 **Stichwort-Erkennungs-Bot (Keyword-Matching)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
45. 📜 **Konsolen-Assistent mit Befehlshistorie** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
46. 🧭 **Einfacher Frage-Router (Themen zuordnen)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
47. ⚡ **Reaktions-Agent (Wenn-Dann auf Eingabe)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
48. 🧩 **Mini-Interpreter für Agenten-Kommandos** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
49. 🎭 **Persönlichkeits-Profil-Agent (Antworten je nach Charakter)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
50. 🌍 **Einfacher Übersetzungs-Router (Wörterbuch-Lookup)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
51. 🌦️ **Wetter-Berater-Agent (Regeln + Empfehlung)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
52. 🏠 **Haushalts-Erinnerungs-Agent (simuliert zeitbasiert)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
53. 🛒 **Einkaufslisten-Agent (Text-Eingabe parsen)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
54. 🪙 **Entscheidungs-Agent mit Begründungstext** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
55. 📥 **Feedback-Sammler-Agent (Antworten kategorisieren)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
56. 🧠 **Simple Skill-Auswahl (Fähigkeiten als Funktionen)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
57. 👋 **Namens-Begrüßungs-Agent (personalisierte Antworten)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
58. 🎬 **Zufalls-Empfehlungs-Agent (Filme/Bücher aus Liste)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
59. 📔 **Journal-Agent (Tageseinträge sammeln & zusammenfassen)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
60. 🔢 **Zähl-Agent (Kommandos zählen & Statistik ausgeben)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)

### 📖 LLM-Wiki-Pattern (Karpathy-Muster) & Wiki-Technik
61. 📝 **Wiki-Seiten-Editor (Konsole, Text speichern/laden)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
62. 🕰️ **Versions-Verlauf für Notizen (einfache History)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
63. 🔍 **Diff-Anzeiger für zwei Textversionen** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
64. 📋 **Änderungs-Protokoll-Tool (Changelog aus Eingaben)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
65. 📚 **Quellen-Sammlung (Zitate mit Herkunftsangabe)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
66. 📄 **Artikel-Entwurf-Verwaltung (Draft/Veröffentlicht-Status)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
67. 🔗 **Wiki-Seiten-Verlinkung (Begriffe verweisen aufeinander)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
68. ↩️ **Rückgängig-Tool für Textänderungen (Undo-Stack)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
69. 🧑‍🤝‍🧑 **Autoren-Beitrags-Zähler (wer hat was geändert)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
70. ✅ **Artikel-Review-Checkliste (Status-Tracker)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
71. 🕵️ **Fakten-Prüf-Checkliste (Quellenangabe-Pflicht)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
72. 🔎 **Wiki-Seiten-Suche (Volltext, einfach)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)

### 🔍 RAG & Vektorsuche
73. 📏 **Text-Ähnlichkeits-Checker (Wortüberschneidung, einfach)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
74. 🏷️ **Dokumenten-Stichwort-Extraktor** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
75. 📊 **Einfacher Ähnlichkeits-Rang (Jaccard-Koeffizient)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
76. ✂️ **Textabschnitt-Splitter (Chunking für lange Texte)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
77. 🔎 **Schlagwort-basierte Dokumenten-Suche** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
78. 🏆 **Relevanz-Ranking-Tool (einfache Zählung)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
79. 🧭 **Frage-zu-Absatz-Zuordner (Keyword-Matching)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
80. 📌 **Zitat-Fundstellen-Finder (Textsuche mit Kontext)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
81. 🪞 **Duplikat-Dokument-Erkenner (Textvergleich)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
82. 🗂️ **Themen-Cluster-Tool (Gruppierung nach Keywords)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
83. ✂️ **Kontext-Ausschnitt-Extraktor (Snippet um Treffer)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
84. 📇 **Dokumenten-Metadaten-Katalog (Titel, Tags, Quelle)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)

### 🔌 MCP (Model Context Protocol) & Tool-Technik
85. 🧰 **Werkzeug-Katalog (Konsole, Liste verfügbarer Tools)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
86. 🔀 **Kommando-zu-Funktion-Zuordner (einfacher Dispatcher)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
87. 📨 **Anfrage-Antwort-Simulator (Client ruft „Server“-Funktion auf)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
88. 📝 **Werkzeug-Beschreibungs-Generator (Name + Parameter als Text)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
89. 💬 **Einfacher Nachrichtenaustausch (Request/Response als Structs)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
90. 🟢 **Verfügbarkeits-Prüfer (welche Werkzeuge sind „online“?)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
91. ✅ **Parameter-Validierungs-Tool (Pflichtfelder prüfen)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
92. 📜 **Werkzeug-Aufruf-Protokoll (Log aller Aufrufe)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
93. 🗂️ **Ressourcen-Katalog (Dateien/Daten eines „Servers“)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
94. 🏷️ **Fähigkeiten-Anzeige (Capabilities eines simulierten Servers)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
95. 📡 **Einfacher Server-Discovery (Liste bekannter Server)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
96. ⚠️ **Fehler-Antwort-Formatter (einheitliches Fehlerformat)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)

### 🗄️ Datenbank-Technik
97. 🗃️ **Datensatz-Speicher (`Vec<Struct>`, CRUD in Konsole)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
98. 🔑 **Primärschlüssel-Generator (fortlaufende ID)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
99. 📋 **Einfache Tabellen-Simulation (`Vec<HashMap>`)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
100. 📄 **CSV-Datenbank-Reader (Zeilen als Datensätze)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
101. 💾 **Einfacher Datei-basierter Speicher (Speichern/Laden)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
102. 🪞 **Duplikat-Prüfer (Eindeutigkeit von Schlüsseln)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
103. 🔀 **Sortier-Tool für Datensätze (nach Feld)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
104. 🔎 **Filter-Abfrage-Tool (WHERE-ähnlich, einfach)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
105. 💽 **Backup-Tool (Datei kopieren, simuliert)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
106. ✅ **Datensatz-Validierungs-Tool (Pflichtfelder)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
107. 🔗 **Einfache Beziehungs-Simulation (Fremdschlüssel als ID-Referenz)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
108. 📜 **Änderungs-Historie für Datensätze (einfaches Log)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)

### 🧮 Eigene Parser & Compiler bauen
109. 🧮 **Einfacher Taschenrechner-Parser (nur + und -)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
110. 🔗 **Klammer-Prüfer (Balanced Parentheses)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
111. 📄 **CSV-Zeilen-Parser (eigene Implementierung ohne Crate)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
112. ✂️ **Einfacher Tokenizer (Text in Wörter/Zahlen zerlegen)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
113. ⌨️ **Kommandozeilen-Argument-Parser (einfach, ohne clap)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
114. ⚙️ **Konfigurationsdatei-Parser (Key=Value-Format)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
115. ➗ **Mathematischer Ausdrucks-Auswerter (Punkt-vor-Strich)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
116. 📡 **Morsecode-Parser (Text ↔ Morse)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
117. 📅 **Datum-Format-Parser (String → Struct)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
118. 🖍️ **Einfacher Markup-Parser (Bold/Italic-Tags erkennen)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
119. 🔗 **URL-Parser (Schema, Host, Pfad zerlegen)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
120. 🔢 **Zahlen-Format-Erkenner (Int/Float/Hex unterscheiden)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)

### 📰 CMS-Technik
121. 📄 **Artikel-Struct (Titel, Inhalt, Autor, Datum)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
122. 🗂️ **Artikel-Verwaltung (Vec, hinzufügen/löschen/auflisten)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
123. 🔍 **Artikel-Suche (Titel/Inhalt nach Stichwort durchsuchen)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
124. 🏷️ **Tag-System (Artikel mit Schlagwörtern versehen)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
125. 📅 **Artikel nach Datum sortieren** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
126. ✂️ **Textauszug-Generator (Vorschau-Text aus Artikelinhalt)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
127. 🔢 **Wortzähler & Lesezeit-Schätzer für Artikel** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
128. 📁 **Artikel in Datei speichern & laden (`std::fs`, einfaches Textformat)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
129. 🌐 **Slug-Generator (Titel → URL-freundlicher String)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
130. 👤 **Autoren-Verwalter (Struct mit Name, zugeordneten Artikeln)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
131. 📝 **Einfacher Markdown-Formatierer (`**fett**`, `*kursiv*` erkennen)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
132. 🗓️ **Veröffentlichungs-Planer (Artikel-Status: Entwurf/Veröffentlicht)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
