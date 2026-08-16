# 🟡 L2 Fortgeschritten

Du kennst die Grundlagen — jetzt geht es um idiomatisches, testbares und wiederverwendbares Rust.

| Thema | Was du lernst |
|---|---|
| 🔗 Iteratoren & Closures | Filterung, Aggregationen, `map`/`filter`/`fold`, Closures als Parameter |
| 🧪 Testing & Tooling | `#[test]`, `clippy`, `rustfmt`, `rustdoc`-Kommentare |
| 🧬 Generics, Traits & Typestate Pattern | Generische Funktionen/Structs, Trait-Bounds, Zustände als Typen kodieren |
| 🎭 Trait Objects vs. statische Generics | `dyn Trait` (Laufzeit-Polymorphismus) vs. `impl Trait`/Generics (Compile-Zeit) |
| 📦 Cargo Workspaces & Modularisierung | Mehrere Crates in einem Workspace, geteilte Abhängigkeiten |
| 🧠 Smart Pointers | `Box<T>`, `Rc<T>`, `Arc<T>`, `RefCell<T>` |

> **Hinweis:** Alle Projekte werden ohne fertige Code-Vorschläge begleitet. Erarbeite die Lösung eigenständig!

---

## 📜 132 Projektvorschläge

### 🧠 Wissenssysteme & Wissenstechnik
1. 🧠 **Generischer Wissens-Container\<T\>** (nur die wichtigsten 10 Themen)
2. 🕸️ **Wissensgraph mit `Rc<RefCell<Knoten>>`** (nur die wichtigsten 10 Themen)
3. 🏷️ **Tag-Such-Engine mit Iteratoren (Filter/Fold)** (nur die wichtigsten 10 Themen)
4. 🎴 **Spaced-Repetition-Karteikarten (SM-2-Algorithmus)** (nur die wichtigsten 10 Themen)
5. 🔌 **Plugin-fähige Wissensdatenbank (Trait Objects)** (nur die wichtigsten 10 Themen)
6. 📚 **Ontologie-Modellierung mit Traits (Ist-Ein-Beziehungen)** (nur die wichtigsten 10 Themen)
7. 📦 **Wissensmanagement-Workspace (Multi-Crate)** (nur die wichtigsten 10 Themen)
8. 🔍 **Volltextsuche-Bibliothek (einfacher invertierter Index)** (nur die wichtigsten 10 Themen)
9. 🧵 **Geteilte Wissensbasis zwischen Modulen (`Arc`)** (nur die wichtigsten 10 Themen)
10. 🤖 **FAQ-Bot mit Trait-basierten Antwortstrategien** (nur die wichtigsten 10 Themen)
11. 📖 **Getestete Zitate-Bibliothek (Doctests & Unit-Tests)** (nur die wichtigsten 10 Themen)
12. 🧮 **Generischer Tagging-Service (Trait-Bounds)** (nur die wichtigsten 10 Themen)

### 🧭 Expertensysteme & Expertensystem-Technik
13. 📏 **Generische Regel-Engine (Trait `Regel`)** (nur die wichtigsten 10 Themen)
14. ⛓️ **Inferenz-Maschine (Forward Chaining, einfach)** (nur die wichtigsten 10 Themen)
15. 🌳 **Entscheidungsbaum mit Trait Objects** (nur die wichtigsten 10 Themen)
16. 🗃️ **Fakten-Datenbank mit generischem Speicher\<T\>** (nur die wichtigsten 10 Themen)
17. 🏗️ **Regelketten-Builder (Builder Pattern)** (nur die wichtigsten 10 Themen)
18. 🔙 **Backward-Chaining-Prototyp** (nur die wichtigsten 10 Themen)
19. 🌫️ **Fuzzy-Logic-Rechner (einfache Zugehörigkeitsfunktionen)** (nur die wichtigsten 10 Themen)
20. 🩺 **Diagnose-System mit Trait-basierten Symptom-Checks** (nur die wichtigsten 10 Themen)
21. 📚 **Konfigurierbare Wenn-Dann-Regel-Bibliothek** (nur die wichtigsten 10 Themen)
22. ⚖️ **Prioritäten-basierte Regelauswahl (Conflict Resolution)** (nur die wichtigsten 10 Themen)
23. 🧪 **Getestete Inferenz-Bibliothek (Unit-Tests)** (nur die wichtigsten 10 Themen)
24. 📦 **Modularer Regel-Workspace (Cargo Workspace)** (nur die wichtigsten 10 Themen)

### 🎓 LMS & Lernplattform-Technik
25. 📚 **Generisches Kurs-Modell\<T\>** (nur die wichtigsten 10 Themen)
26. 🔐 **Rollenbasiertes Berechtigungssystem (Trait Objects: Student/Lehrer/Admin)** (nur die wichtigsten 10 Themen)
27. ❓ **Quiz-Engine mit Trait-basierten Fragetypen** (nur die wichtigsten 10 Themen)
28. 📈 **Fortschritts-Tracking-Bibliothek (generisch)** (nur die wichtigsten 10 Themen)
29. 🕸️ **Lernpfad-Graph mit `Rc<RefCell<Lektion>>`** (nur die wichtigsten 10 Themen)
30. 🎓 **Notenberechnung mit Trait `Bewertbar`** (nur die wichtigsten 10 Themen)
31. 📦 **Kurs-Workspace (Multi-Crate)** (nur die wichtigsten 10 Themen)
32. 🧪 **Getestete Einschreibungs-Bibliothek** (nur die wichtigsten 10 Themen)
33. 🔌 **Plugin-fähiges Content-Format (Trait Objects: Video/Text/Quiz)** (nur die wichtigsten 10 Themen)
34. 🏗️ **Zertifikats-Builder (Builder Pattern)** (nur die wichtigsten 10 Themen)
35. 🧵 **Geteilter Kurskatalog (`Arc`)** (nur die wichtigsten 10 Themen)
36. 🧮 **Generischer Bewertungs-Aggregator** (nur die wichtigsten 10 Themen)

### 🤖 Eigener KI-Agent & Agenten-Technik
37. 🧰 **Generisches Tool-Trait (`Tool::execute()`)** (nur die wichtigsten 10 Themen)
38. 🔌 **Plugin-fähiges Tool-System (Trait Objects)** (nur die wichtigsten 10 Themen)
39. 🔁 **Einfache Agenten-Loop (Denken-Handeln-Beobachten)** (nur die wichtigsten 10 Themen)
40. 🧠 **Gedächtnis-Speicher mit generischem Container\<T\>** (nur die wichtigsten 10 Themen)
41. 💬 **Kontext-Fenster-Simulator (`Vec<Nachricht>`)** (nur die wichtigsten 10 Themen)
42. 🧩 **Function-Calling-Dispatcher (Trait-basiert)** (nur die wichtigsten 10 Themen)
43. 🚦 **Zustands-Maschine für Agenten-Modi (Typestate)** (nur die wichtigsten 10 Themen)
44. 🎭 **Multi-Tool-Orchestrator (Trait Objects)** (nur die wichtigsten 10 Themen)
45. 🧪 **Getestete Prompt-Template-Bibliothek** (nur die wichtigsten 10 Themen)
46. 🏗️ **Agenten-Konfiguration mit Builder Pattern** (nur die wichtigsten 10 Themen)
47. 🧵 **Geteilter Agenten-Zustand (`Rc<RefCell<_>>`)** (nur die wichtigsten 10 Themen)
48. 📋 **Generischer Aufgaben-Planer (Trait `Planbar`)** (nur die wichtigsten 10 Themen)
49. 👀 **Observer-Pattern für Agenten-Events (`Rc`-basiert)** (nur die wichtigsten 10 Themen)
50. 🔤 **Generischer Antwort-Parser (Trait `AntwortParser`)** (nur die wichtigsten 10 Themen)
51. 🔗 **Agenten-Pipeline mit Iterator-Ketten (Vor-/Verarbeitung)** (nur die wichtigsten 10 Themen)
52. 🔁 **Generische Retry-Strategie für fehlgeschlagene Tool-Aufrufe** (nur die wichtigsten 10 Themen)
53. 🎭 **Rollen-basierter Multi-Persona-Agent (Trait Objects)** (nur die wichtigsten 10 Themen)
54. 🧪 **Getestete Tokenizer-Bibliothek (einfach)** (nur die wichtigsten 10 Themen)
55. 📜 **Ereignis-Log für Agenten-Aktionen (`Vec<Ereignis>`)** (nur die wichtigsten 10 Themen)
56. 🧩 **Strategie-Muster für Antwortgenerierung (regelbasiert vs. Template)** (nur die wichtigsten 10 Themen)
57. 🗃️ **Cache-Schicht für wiederholte Anfragen (`HashMap`)** (nur die wichtigsten 10 Themen)
58. 📦 **Modularer Agenten-Workspace (Core, Tools, CLI)** (nur die wichtigsten 10 Themen)
59. ⚙️ **Konfigurierbare Verhaltensregeln (Trait-Bounds)** (nur die wichtigsten 10 Themen)
60. ⛓️ **Validierungs-Kette für Tool-Eingaben (Chain of Responsibility)** (nur die wichtigsten 10 Themen)

### 📖 LLM-Wiki-Pattern (Karpathy-Muster) & Wiki-Technik
61. 🔀 **Generischer Diff-Algorithmus (Zeilen-Vergleich)** (nur die wichtigsten 10 Themen)
62. 📑 **Versionierte Wiki-Seite (Struct mit `History<Vec<Version>>`)** (nur die wichtigsten 10 Themen)
63. 🕸️ **Revisions-Graph mit `Rc<RefCell<_>>`** (nur die wichtigsten 10 Themen)
64. ✅ **Trait `Reviewbar` für Content-Prüfschritte** (nur die wichtigsten 10 Themen)
65. 🔁 **Iterativer Verfeinerungs-Loop (Entwurf → Kritik → Überarbeitung, simuliert)** (nur die wichtigsten 10 Themen)
66. 📚 **Zitat-Validierungs-Bibliothek (Trait-basiert)** (nur die wichtigsten 10 Themen)
67. 🔌 **Plugin-fähiges Review-Pipeline-System (Trait Objects)** (nur die wichtigsten 10 Themen)
68. 🧪 **Getestete Diff-Bibliothek (Unit-Tests)** (nur die wichtigsten 10 Themen)
69. 🧩 **Merge-Konflikt-Löser (einfach, zeilenbasiert)** (nur die wichtigsten 10 Themen)
70. 📦 **Wiki-Workspace (Multi-Crate: Core, Diff, CLI)** (nur die wichtigsten 10 Themen)
71. 🧮 **Generischer Änderungs-Aggregator (Statistik über Edits)** (nur die wichtigsten 10 Themen)
72. 🏗️ **Builder für Artikel-Metadaten (Autor, Datum, Quellen)** (nur die wichtigsten 10 Themen)

### 🔍 RAG & Vektorsuche
73. 🧮 **Generischer Vektor-Typ mit Ähnlichkeitsberechnung** (nur die wichtigsten 10 Themen)
74. 📐 **Kosinus-Ähnlichkeits-Bibliothek (Trait `Vergleichbar`)** (nur die wichtigsten 10 Themen)
75. 📇 **Einfacher Vektor-Index (`Vec<(ID, Vektor)>`, lineare Suche)** (nur die wichtigsten 10 Themen)
76. ✂️ **Chunking-Pipeline mit Iteratoren (Overlap-Splitting)** (nur die wichtigsten 10 Themen)
77. 🔌 **Trait-basierter Embedding-Provider (austauschbar, simuliert)** (nur die wichtigsten 10 Themen)
78. 🏆 **Top-K-Suche mit Prioritäts-Warteschlange (`BinaryHeap`)** (nur die wichtigsten 10 Themen)
79. 🧪 **Getestete Ähnlichkeits-Bibliothek (Unit-Tests)** (nur die wichtigsten 10 Themen)
80. 🔀 **Plugin-fähiges Retrieval-System (Keyword vs. Vektor)** (nur die wichtigsten 10 Themen)
81. 🗃️ **Generischer Dokumenten-Store (`HashMap<ID, Dokument>`)** (nur die wichtigsten 10 Themen)
82. 🔁 **RAG-Pipeline-Prototyp (Retrieve → Kontext → simulierte Antwort)** (nur die wichtigsten 10 Themen)
83. 🧵 **Geteilter Vektor-Index (`Arc<RwLock<_>>`)** (nur die wichtigsten 10 Themen)
84. 🏗️ **Builder für RAG-Konfiguration (Chunk-Größe, Top-K, Overlap)** (nur die wichtigsten 10 Themen)

### 🔌 MCP (Model Context Protocol) & Tool-Technik
85. 🧰 **Generisches Tool-Schema (Trait `McpTool`: Name/Parameter/Ausführung)** (nur die wichtigsten 10 Themen)
86. 📨 **JSON-RPC-ähnlicher Nachrichtentyp (serde: Request/Response/Notification)** (nur die wichtigsten 10 Themen)
87. 🔀 **Trait-basierter Transport (stdio vs. simuliertes HTTP)** (nur die wichtigsten 10 Themen)
88. 📇 **Werkzeug-Registry mit dynamischer Registrierung (Trait Objects)** (nur die wichtigsten 10 Themen)
89. 🤝 **Capability-Verhandlung (Client/Server einigen sich auf Features)** (nur die wichtigsten 10 Themen)
90. 🗂️ **Ressourcen-Provider-Trait (austauschbare Datenquellen)** (nur die wichtigsten 10 Themen)
91. 🧪 **Getestete Schema-Validierungs-Bibliothek** (nur die wichtigsten 10 Themen)
92. 🚦 **Session-Zustandsmaschine (Typestate: Verbunden/Initialisiert/Aktiv)** (nur die wichtigsten 10 Themen)
93. 🔌 **Plugin-fähiger MCP-Server-Kern (Trait Objects für Tools)** (nur die wichtigsten 10 Themen)
94. 📚 **Multi-Server-Client (mehrere Server gleichzeitig verwalten)** (nur die wichtigsten 10 Themen)
95. 🧵 **Geteilter Werkzeug-Kontext (`Rc<RefCell<_>>`)** (nur die wichtigsten 10 Themen)
96. 🏗️ **Builder für MCP-Server-Konfiguration** (nur die wichtigsten 10 Themen)

### 🗄️ Datenbank-Technik
97. 🗃️ **Generischer In-Memory-Store\<K, V\> (Trait `Repository`)** (nur die wichtigsten 10 Themen)
98. 🌲 **Einfacher B-Baum (Lernprojekt, Einfügen/Suchen)** (nur die wichtigsten 10 Themen)
99. 📇 **Index-Struktur mit HashMap (Sekundärindex)** (nur die wichtigsten 10 Themen)
100. 🔄 **Transaktions-Simulator (Commit/Rollback, einfach)** (nur die wichtigsten 10 Themen)
101. 🔍 **Query-Builder (Fluent API für Filter-Ketten)** (nur die wichtigsten 10 Themen)
102. 🧪 **Getestete Persistenz-Bibliothek (Serialisierung mit serde)** (nur die wichtigsten 10 Themen)
103. 🔌 **Plugin-fähiges Storage-Backend (Trait Objects: Memory/Datei)** (nur die wichtigsten 10 Themen)
104. 🔧 **Migrations-Tool (Schema-Versionen verwalten)** (nur die wichtigsten 10 Themen)
105. 🧵 **Geteilter Datenbank-Zustand (`Arc<RwLock<_>>`)** (nur die wichtigsten 10 Themen)
106. 📖 **Generischer Paginierungs-Iterator** (nur die wichtigsten 10 Themen)
107. ⚖️ **Constraint-Prüfung mit Trait-Bounds (Unique, NotNull)** (nur die wichtigsten 10 Themen)
108. 📦 **Datenbank-Workspace (Core, Query, CLI)** (nur die wichtigsten 10 Themen)

### 🧮 Eigene Parser & Compiler bauen
109. 🔤 **Generischer Tokenizer (Trait `Lexer`)** (nur die wichtigsten 10 Themen)
110. 🌳 **Rekursiver-Abstieg-Parser für Arithmetik (Klammern & Rangfolge)** (nur die wichtigsten 10 Themen)
111. 🧩 **AST-Datenstruktur (enum-basiert, per Pattern Matching ausgewertet)** (nur die wichtigsten 10 Themen)
112. 🧪 **Getesteter Lexer (Unit-Tests für Token-Erkennung)** (nur die wichtigsten 10 Themen)
113. ⚠️ **Fehlerbehandlung im Parser (Meldungen mit Position)** (nur die wichtigsten 10 Themen)
114. 🔌 **Plugin-fähiges Grammatik-System (Trait Objects für Regeln)** (nur die wichtigsten 10 Themen)
115. 📦 **Rekursiver JSON-Mini-Parser (eigene Implementierung)** (nur die wichtigsten 10 Themen)
116. 🚦 **Zustandsbasierter Lexer (Typestate für Lexer-Modi)** (nur die wichtigsten 10 Themen)
117. 🧱 **Parser-Kombinatoren (eigene, einfache Bausteine)** (nur die wichtigsten 10 Themen)
118. 🖨️ **AST-Pretty-Printer (Baum zurück in Text)** (nur die wichtigsten 10 Themen)
119. 📦 **Parser-Workspace (Lexer-Crate, Parser-Crate, CLI)** (nur die wichtigsten 10 Themen)
120. ❌ **Generischer Fehler-Typ (thiserror-ähnlicher Aufbau)** (nur die wichtigsten 10 Themen)

### 📰 CMS-Technik
121. 🔌 **Trait-basiertes Content-Repository (Mock- vs. Datei-Backend)** (nur die wichtigsten 10 Themen)
122. 📦 **CMS-Workspace (Core-, Storage-, CLI-Crate)** (nur die wichtigsten 10 Themen)
123. 🏗️ **Builder für Artikel-Erstellung (Titel, Tags, Status)** (nur die wichtigsten 10 Themen)
124. 🔁 **Generischer Renderer-Trait (Markdown, HTML, Plaintext)** (nur die wichtigsten 10 Themen)
125. 🧵 **Geteilter Artikel-Cache (`Arc<Mutex<_>>`)** (nur die wichtigsten 10 Themen)
126. 🧪 **Getestete Slug-Bibliothek (Unicode, Sonderzeichen)** (nur die wichtigsten 10 Themen)
127. 🔗 **Iterator-Kette für Artikel-Filterung (Tags, Datum, Status)** (nur die wichtigsten 10 Themen)
128. 📐 **Trait-Objekt-basiertes Plugin-System (Content-Transformer)** (nur die wichtigsten 10 Themen)
129. 🗃️ **Versionierungs-System für Artikel (Diff zwischen Revisionen)** (nur die wichtigsten 10 Themen)
130. 🔍 **Volltextsuche mit Index (`HashMap<Wort, Vec<ArtikelId>>`)** (nur die wichtigsten 10 Themen)
131. 🧩 **Template-Engine (einfache Platzhalter-Ersetzung, `{{titel}}`)** (nur die wichtigsten 10 Themen)
132. 📊 **Statistik-Modul (Artikel pro Autor/Tag, generisch aggregiert)** (nur die wichtigsten 10 Themen)
