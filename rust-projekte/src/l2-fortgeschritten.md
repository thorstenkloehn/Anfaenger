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

## 📜 100+ Projektvorschläge

### 🔗 Iteratoren & Closures
1. 📊 **Verkaufsdaten-Analyzer** (nur die wichtigsten 10 Themen)
2. 🎓 **Notenauswertung** (nur die wichtigsten 10 Themen)
3. 🧹 **Text-Bereiniger-Pipeline** (nur die wichtigsten 10 Themen)
4. 🛒 **Warenkorb-Filter** (nur die wichtigsten 10 Themen)
5. 🎯 **Highscore-Top-N** (nur die wichtigsten 10 Themen)
6. 📬 **E-Mail-Validator-Batch** (nur die wichtigsten 10 Themen)
7. 🧮 **Statistik-Toolkit** (nur die wichtigsten 10 Themen)
8. 🔁 **Duplikat-Entferner** (nur die wichtigsten 10 Themen)
9. 🧾 **Rechnungsposten-Gruppierer** (nur die wichtigsten 10 Themen)
10. 🎵 **Playlist-Shuffler mit Filter** (nur die wichtigsten 10 Themen)
11. 🏭 **Sensor-Ausreißer-Filter** (nur die wichtigsten 10 Themen)
12. 🧑‍🤝‍🧑 **Team-Einteiler (Closure als Kriterium)** (nur die wichtigsten 10 Themen)
13. 📚 **Bücher-nach-Autor-Gruppierung** (nur die wichtigsten 10 Themen)
14. 🌡️ **Temperaturreihen-Glätter** (nur die wichtigsten 10 Themen)
15. 🎮 **Highscore-Rang-Ermittler** (nur die wichtigsten 10 Themen)
16. 🧵 **Lazy-Pipeline-Demonstrator** (nur die wichtigsten 10 Themen)

### 🧪 Testing & Tooling
17. 🧪 **Testgetriebene String-Utils** (nur die wichtigsten 10 Themen)
18. 📐 **Geometrie-Bibliothek mit Doctests** (nur die wichtigsten 10 Themen)
19. 🧮 **Getestete Mathe-Bibliothek** (nur die wichtigsten 10 Themen)
20. 🔤 **Parser mit Regressionstests** (nur die wichtigsten 10 Themen)
21. 🧹 **Clippy-Sauberes CLI-Tool** (nur die wichtigsten 10 Themen)
22. 🎨 **Rustfmt-Konventions-Check** (nur die wichtigsten 10 Themen)
23. 📖 **Dokumentierte Utility-Crate** (nur die wichtigsten 10 Themen)
24. 🧪 **Property-nahe Beispieltests** (nur die wichtigsten 10 Themen)
25. 🧯 **Panic-Verhalten testen** (nur die wichtigsten 10 Themen)
26. 🧮 **Testabdeckung erhöhen** (nur die wichtigsten 10 Themen)
27. 🗃️ **Test-Fixtures-Bibliothek** (nur die wichtigsten 10 Themen)
28. 🔍 **Integrationstests-Verzeichnis** (nur die wichtigsten 10 Themen)
29. 🧪 **Benchmark-Vorstufe mit `#[test]`** (nur die wichtigsten 10 Themen)
30. 🧾 **CI-Checkliste-Projekt** (nur die wichtigsten 10 Themen)

### 🧬 Generics, Traits & Typestate
31. 🚪 **Typestate-Tür** (nur die wichtigsten 10 Themen)
32. 🌐 **Typestate-Netzwerkverbindung** (nur die wichtigsten 10 Themen)
33. 📦 **Generischer Stapel (Stack\<T\>)** (nur die wichtigsten 10 Themen)
34. 🔁 **Generische Warteschlange (Queue\<T\>)** (nur die wichtigsten 10 Themen)
35. 🧮 **Generischer Statistik-Container** (nur die wichtigsten 10 Themen)
36. 🧾 **Trait `Rechnung`** (nur die wichtigsten 10 Themen)
37. 🍔 **Typestate-Bestellung** (nur die wichtigsten 10 Themen)
38. 🔐 **Typestate-Login-Fluss** (nur die wichtigsten 10 Themen)
39. 📐 **Generisches Vergleichs-Utility** (nur die wichtigsten 10 Themen)
40. 🧵 **Trait `Formatierbar`** (nur die wichtigsten 10 Themen)
41. 🚦 **Typestate-Ampel** (nur die wichtigsten 10 Themen)
42. 🧮 **Generischer Cache\<K, V\>** (nur die wichtigsten 10 Themen)
43. 🏗️ **Builder mit Typestate** (nur die wichtigsten 10 Themen)
44. 🎒 **Generisches Inventar\<Item\>** (nur die wichtigsten 10 Themen)
45. 🔄 **Trait `Konvertierbar`** (nur die wichtigsten 10 Themen)
46. 📊 **Generische Aggregations-Funktion** (nur die wichtigsten 10 Themen)

### 🎭 Trait Objects vs. statische Generics
47. 🎨 **Plugin-System für Textfilter** (nur die wichtigsten 10 Themen)
48. 🔊 **Audio-Effekt-Kette** (nur die wichtigsten 10 Themen)
49. 🖼️ **Formen-Renderer** (nur die wichtigsten 10 Themen)
50. 🧮 **Strategie-Muster: Sortieralgorithmen** (nur die wichtigsten 10 Themen)
51. 🔔 **Benachrichtigungs-Kanäle** (nur die wichtigsten 10 Themen)
52. 🧾 **Rabatt-Strategien** (nur die wichtigsten 10 Themen)
53. 🎮 **Gegner-KI-Verhalten** (nur die wichtigsten 10 Themen)
54. ⚙️ **Statisch vs. dynamisch: Performance-Vergleich** (nur die wichtigsten 10 Themen)
55. 🧩 **Middleware-Kette** (nur die wichtigsten 10 Themen)
56. 🎭 **Command-Pattern mit Trait Objects** (nur die wichtigsten 10 Themen)
57. 🧪 **Validierungs-Regelketten** (nur die wichtigsten 10 Themen)
58. 🖨️ **Export-Formate (Trait Object)** (nur die wichtigsten 10 Themen)
59. 🧮 **Generischer vs. dynamischer Taschenrechner** (nur die wichtigsten 10 Themen)
60. 🎨 **Theme-System** (nur die wichtigsten 10 Themen)

### 📦 Cargo Workspaces & Modularisierung
61. 📦 **Multi-Crate CLI-Tool** (nur die wichtigsten 10 Themen)
62. 🧮 **Mathe-Bibliothek + Test-Crate** (nur die wichtigsten 10 Themen)
63. 🌐 **Geteilte Datentypen-Crate** (nur die wichtigsten 10 Themen)
64. 🏗️ **Plugin-Workspace** (nur die wichtigsten 10 Themen)
65. 🧾 **Rechnungssystem als Workspace** (nur die wichtigsten 10 Themen)
66. 📚 **Bibliotheksverwaltung als Workspace** (nur die wichtigsten 10 Themen)
67. 🔧 **Gemeinsame Utility-Crate** (nur die wichtigsten 10 Themen)
68. 🎮 **Spiel-Engine-Workspace** (nur die wichtigsten 10 Themen)
69. 🧪 **Workspace mit gemeinsamer Test-Utility-Crate** (nur die wichtigsten 10 Themen)
70. 📦 **Feature-Flag-Experiment im Workspace** (nur die wichtigsten 10 Themen)

### 🧠 Smart Pointers (Box, Rc, Arc, RefCell)
71. 🌳 **Interaktiver Ordnerbaum** (nur die wichtigsten 10 Themen)
72. 🔗 **Verkettete Liste (Box\<T\>)** (nur die wichtigsten 10 Themen)
73. 🕸️ **Beobachter-Muster mit `Rc`** (nur die wichtigsten 10 Themen)
74. 🧮 **Geteilter Zähler** (nur die wichtigsten 10 Themen)
75. 🌲 **Binärbaum mit `Box`** (nur die wichtigsten 10 Themen)
76. 🧾 **Geteilte Konfiguration** (nur die wichtigsten 10 Themen)
77. 🔄 **Zyklen-Falle demonstrieren** (nur die wichtigsten 10 Themen)
78. 🧵 **Vorbereitung auf Concurrency: `Arc\<Mutex\<T\>\>`** (nur die wichtigsten 10 Themen)
79. 🗂️ **Geteilter Cache zwischen Komponenten** (nur die wichtigsten 10 Themen)
80. 🧩 **Graph mit `Rc`-Kanten** (nur die wichtigsten 10 Themen)
81. 📋 **Undo-Historie mit `Box`** (nur die wichtigsten 10 Themen)
82. 🌐 **Geteilter Zustand in einem Text-Adventure** (nur die wichtigsten 10 Themen)

### 🧩 Kombinierte Profi-Projekte
83. 📚 **Bibliotheks-Engine** (nur die wichtigsten 10 Themen)
84. 🎮 **Modulares Spiele-Framework** (nur die wichtigsten 10 Themen)
85. 🧾 **Buchhaltungs-Bibliothek** (nur die wichtigsten 10 Themen)
86. 🔌 **Erweiterbares Export-System** (nur die wichtigsten 10 Themen)
87. 🧠 **Zustandsmaschine mit Typestate + Smart Pointers** (nur die wichtigsten 10 Themen)
88. 🧪 **TDD-Iterator-Bibliothek** (nur die wichtigsten 10 Themen)
89. 🎭 **Simulierte Event-Bus-Architektur** (nur die wichtigsten 10 Themen)
90. 📦 **Konfigurierbare Pipeline-Bibliothek** (nur die wichtigsten 10 Themen)
91. 🌳 **Dateisystem-Simulator** (nur die wichtigsten 10 Themen)
92. 🧮 **Generischer Event-Aggregator** (nur die wichtigsten 10 Themen)
93. 🎨 **Plugin-fähiger Text-Editor (Kern)** (nur die wichtigsten 10 Themen)
94. 🔐 **Typestate-Auth-Bibliothek** (nur die wichtigsten 10 Themen)
95. 🧵 **Geteilter Konfigurationsspeicher** (nur die wichtigsten 10 Themen)
96. 🏗️ **Builder-Bibliothek mit Trait-Bounds** (nur die wichtigsten 10 Themen)
97. 🧾 **Rechnungs-Pipeline** (nur die wichtigsten 10 Themen)
98. 🎮 **Highscore-Service als Mini-Crate** (nur die wichtigsten 10 Themen)
99. 🧩 **Middleware-Framework (Mini)** (nur die wichtigsten 10 Themen)
100. 🌲 **Verzeichnisbaum-Exporter** (nur die wichtigsten 10 Themen)
101. 🧠 **Geteilte Statistik-Engine** (nur die wichtigsten 10 Themen)
102. 📦 **Mini-Paketverwaltung (Lernprojekt)** (nur die wichtigsten 10 Themen)

### 💼 Praxisnahe Business- & Firmenprojekte
103. 🧰 **Interne CLI für Deployment-Skripte** (nur die wichtigsten 10 Themen)
104. 📜 **Git-Commit-Linter (Conventional Commits)** (nur die wichtigsten 10 Themen)
105. 📝 **Changelog-Generator** (nur die wichtigsten 10 Themen)
106. 🔍 **Lizenz-Compliance-Checker für Dependencies** (nur die wichtigsten 10 Themen)
107. 📦 **Generische Retry/Backoff-Bibliothek** (nur die wichtigsten 10 Themen)
108. 🚦 **Generische Rate-Limiter-Bibliothek** (nur die wichtigsten 10 Themen)
109. 🧪 **Testdaten-Generator-Bibliothek** (nur die wichtigsten 10 Themen)
110. 🔌 **Generisches API-Client-SDK** (nur die wichtigsten 10 Themen)
111. 🗃️ **Interne Caching-Schicht (generisch)** (nur die wichtigsten 10 Themen)
112. 🧩 **Plugin-System für ein Build-Tool** (nur die wichtigsten 10 Themen)
113. 📊 **Log-Parser-Bibliothek (intern)** (nur die wichtigsten 10 Themen)
114. 🧮 **Feature-Flag-SDK (Client-Bibliothek)** (nur die wichtigsten 10 Themen)
115. 🧾 **Config-Validierungs-Tool** (nur die wichtigsten 10 Themen)
116. 🏗️ **Interner Code-Qualitäts-Checker** (nur die wichtigsten 10 Themen)
117. 📦 **Monorepo-Build-Orchestrator (Workspace)** (nur die wichtigsten 10 Themen)
118. 🔐 **Interne Secrets-Zugriffsschicht (Typestate)** (nur die wichtigsten 10 Themen)
119. 🧵 **Generischer Event-Dispatcher** (nur die wichtigsten 10 Themen)
120. 📚 **Interne Dokumentations-Linter-Bibliothek** (nur die wichtigsten 10 Themen)
