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
1. 📊 **Verkaufsdaten-Analyzer** (10-15 Lektionen) Miniprojekt
2. 🎓 **Notenauswertung** (10-15 Lektionen) Miniprojekt
3. 🧹 **Text-Bereiniger-Pipeline** (10-15 Lektionen) Miniprojekt
4. 🛒 **Warenkorb-Filter** (10-15 Lektionen) Miniprojekt
5. 🎯 **Highscore-Top-N** (10-15 Lektionen) Miniprojekt
6. 📬 **E-Mail-Validator-Batch** (10-15 Lektionen) Miniprojekt
7. 🧮 **Statistik-Toolkit** (10-15 Lektionen) Miniprojekt
8. 🔁 **Duplikat-Entferner** (10-15 Lektionen) Miniprojekt
9. 🧾 **Rechnungsposten-Gruppierer** (10-15 Lektionen) Miniprojekt
10. 🎵 **Playlist-Shuffler mit Filter** (10-15 Lektionen) Miniprojekt
11. 🏭 **Sensor-Ausreißer-Filter** (10-15 Lektionen) Miniprojekt
12. 🧑‍🤝‍🧑 **Team-Einteiler (Closure als Kriterium)** (10-15 Lektionen) Miniprojekt
13. 📚 **Bücher-nach-Autor-Gruppierung** (10-15 Lektionen) Miniprojekt
14. 🌡️ **Temperaturreihen-Glätter** (10-15 Lektionen) Miniprojekt
15. 🎮 **Highscore-Rang-Ermittler** (10-15 Lektionen) Miniprojekt
16. 🧵 **Lazy-Pipeline-Demonstrator** (10-15 Lektionen) Miniprojekt

### 🧪 Testing & Tooling
17. 🧪 **Testgetriebene String-Utils** (10-15 Lektionen) Miniprojekt
18. 📐 **Geometrie-Bibliothek mit Doctests** (10-15 Lektionen) Miniprojekt
19. 🧮 **Getestete Mathe-Bibliothek** (10-15 Lektionen) Miniprojekt
20. 🔤 **Parser mit Regressionstests** (10-15 Lektionen) Miniprojekt
21. 🧹 **Clippy-Sauberes CLI-Tool** (10-15 Lektionen) Miniprojekt
22. 🎨 **Rustfmt-Konventions-Check** (10-15 Lektionen) Miniprojekt
23. 📖 **Dokumentierte Utility-Crate** (10-15 Lektionen) Miniprojekt
24. 🧪 **Property-nahe Beispieltests** (10-15 Lektionen) Miniprojekt
25. 🧯 **Panic-Verhalten testen** (10-15 Lektionen) Miniprojekt
26. 🧮 **Testabdeckung erhöhen** (10-15 Lektionen) Miniprojekt
27. 🗃️ **Test-Fixtures-Bibliothek** (10-15 Lektionen) Miniprojekt
28. 🔍 **Integrationstests-Verzeichnis** (10-15 Lektionen) Miniprojekt
29. 🧪 **Benchmark-Vorstufe mit `#[test]`** (10-15 Lektionen) Miniprojekt
30. 🧾 **CI-Checkliste-Projekt** (10-15 Lektionen) Miniprojekt

### 🧬 Generics, Traits & Typestate
31. 🚪 **Typestate-Tür** (10-15 Lektionen) Miniprojekt
32. 🌐 **Typestate-Netzwerkverbindung** (10-15 Lektionen) Miniprojekt
33. 📦 **Generischer Stapel (Stack\<T\>)** (10-15 Lektionen) Miniprojekt
34. 🔁 **Generische Warteschlange (Queue\<T\>)** (10-15 Lektionen) Miniprojekt
35. 🧮 **Generischer Statistik-Container** (10-15 Lektionen) Miniprojekt
36. 🧾 **Trait `Rechnung`** (10-15 Lektionen) Miniprojekt
37. 🍔 **Typestate-Bestellung** (10-15 Lektionen) Miniprojekt
38. 🔐 **Typestate-Login-Fluss** (10-15 Lektionen) Miniprojekt
39. 📐 **Generisches Vergleichs-Utility** (10-15 Lektionen) Miniprojekt
40. 🧵 **Trait `Formatierbar`** (10-15 Lektionen) Miniprojekt
41. 🚦 **Typestate-Ampel** (10-15 Lektionen) Miniprojekt
42. 🧮 **Generischer Cache\<K, V\>** (10-15 Lektionen) Miniprojekt
43. 🏗️ **Builder mit Typestate** (10-15 Lektionen) Miniprojekt
44. 🎒 **Generisches Inventar\<Item\>** (10-15 Lektionen) Miniprojekt
45. 🔄 **Trait `Konvertierbar`** (10-15 Lektionen) Miniprojekt
46. 📊 **Generische Aggregations-Funktion** (10-15 Lektionen) Miniprojekt

### 🎭 Trait Objects vs. statische Generics
47. 🎨 **Plugin-System für Textfilter** (10-15 Lektionen) Miniprojekt
48. 🔊 **Audio-Effekt-Kette** (10-15 Lektionen) Miniprojekt
49. 🖼️ **Formen-Renderer** (10-15 Lektionen) Miniprojekt
50. 🧮 **Strategie-Muster: Sortieralgorithmen** (10-15 Lektionen) Miniprojekt
51. 🔔 **Benachrichtigungs-Kanäle** (10-15 Lektionen) Miniprojekt
52. 🧾 **Rabatt-Strategien** (10-15 Lektionen) Miniprojekt
53. 🎮 **Gegner-KI-Verhalten** (10-15 Lektionen) Miniprojekt
54. ⚙️ **Statisch vs. dynamisch: Performance-Vergleich** (10-15 Lektionen) Miniprojekt
55. 🧩 **Middleware-Kette** (10-15 Lektionen) Miniprojekt
56. 🎭 **Command-Pattern mit Trait Objects** (10-15 Lektionen) Miniprojekt
57. 🧪 **Validierungs-Regelketten** (10-15 Lektionen) Miniprojekt
58. 🖨️ **Export-Formate (Trait Object)** (10-15 Lektionen) Miniprojekt
59. 🧮 **Generischer vs. dynamischer Taschenrechner** (10-15 Lektionen) Miniprojekt
60. 🎨 **Theme-System** (10-15 Lektionen) Miniprojekt

### 📦 Cargo Workspaces & Modularisierung
61. 📦 **Multi-Crate CLI-Tool** (10-15 Lektionen) Miniprojekt
62. 🧮 **Mathe-Bibliothek + Test-Crate** (10-15 Lektionen) Miniprojekt
63. 🌐 **Geteilte Datentypen-Crate** (10-15 Lektionen) Miniprojekt
64. 🏗️ **Plugin-Workspace** (10-15 Lektionen) Miniprojekt
65. 🧾 **Rechnungssystem als Workspace** (10-15 Lektionen) Miniprojekt
66. 📚 **Bibliotheksverwaltung als Workspace** (10-15 Lektionen) Miniprojekt
67. 🔧 **Gemeinsame Utility-Crate** (10-15 Lektionen) Miniprojekt
68. 🎮 **Spiel-Engine-Workspace** (10-15 Lektionen) Miniprojekt
69. 🧪 **Workspace mit gemeinsamer Test-Utility-Crate** (10-15 Lektionen) Miniprojekt
70. 📦 **Feature-Flag-Experiment im Workspace** (10-15 Lektionen) Miniprojekt

### 🧠 Smart Pointers (Box, Rc, Arc, RefCell)
71. 🌳 **Interaktiver Ordnerbaum** (10-15 Lektionen) Miniprojekt
72. 🔗 **Verkettete Liste (Box\<T\>)** (10-15 Lektionen) Miniprojekt
73. 🕸️ **Beobachter-Muster mit `Rc`** (10-15 Lektionen) Miniprojekt
74. 🧮 **Geteilter Zähler** (10-15 Lektionen) Miniprojekt
75. 🌲 **Binärbaum mit `Box`** (10-15 Lektionen) Miniprojekt
76. 🧾 **Geteilte Konfiguration** (10-15 Lektionen) Miniprojekt
77. 🔄 **Zyklen-Falle demonstrieren** (10-15 Lektionen) Miniprojekt
78. 🧵 **Vorbereitung auf Concurrency: `Arc\<Mutex\<T\>\>`** (10-15 Lektionen) Miniprojekt
79. 🗂️ **Geteilter Cache zwischen Komponenten** (10-15 Lektionen) Miniprojekt
80. 🧩 **Graph mit `Rc`-Kanten** (10-15 Lektionen) Miniprojekt
81. 📋 **Undo-Historie mit `Box`** (10-15 Lektionen) Miniprojekt
82. 🌐 **Geteilter Zustand in einem Text-Adventure** (10-15 Lektionen) Miniprojekt

### 🧩 Kombinierte Profi-Projekte
83. 📚 **Bibliotheks-Engine** (10-15 Lektionen) Miniprojekt
84. 🎮 **Modulares Spiele-Framework** (10-15 Lektionen) Miniprojekt
85. 🧾 **Buchhaltungs-Bibliothek** (10-15 Lektionen) Miniprojekt
86. 🔌 **Erweiterbares Export-System** (10-15 Lektionen) Miniprojekt
87. 🧠 **Zustandsmaschine mit Typestate + Smart Pointers** (10-15 Lektionen) Miniprojekt
88. 🧪 **TDD-Iterator-Bibliothek** (10-15 Lektionen) Miniprojekt
89. 🎭 **Simulierte Event-Bus-Architektur** (10-15 Lektionen) Miniprojekt
90. 📦 **Konfigurierbare Pipeline-Bibliothek** (10-15 Lektionen) Miniprojekt
91. 🌳 **Dateisystem-Simulator** (10-15 Lektionen) Miniprojekt
92. 🧮 **Generischer Event-Aggregator** (10-15 Lektionen) Miniprojekt
93. 🎨 **Plugin-fähiger Text-Editor (Kern)** (10-15 Lektionen) Miniprojekt
94. 🔐 **Typestate-Auth-Bibliothek** (10-15 Lektionen) Miniprojekt
95. 🧵 **Geteilter Konfigurationsspeicher** (10-15 Lektionen) Miniprojekt
96. 🏗️ **Builder-Bibliothek mit Trait-Bounds** (10-15 Lektionen) Miniprojekt
97. 🧾 **Rechnungs-Pipeline** (10-15 Lektionen) Miniprojekt
98. 🎮 **Highscore-Service als Mini-Crate** (10-15 Lektionen) Miniprojekt
99. 🧩 **Middleware-Framework (Mini)** (10-15 Lektionen) Miniprojekt
100. 🌲 **Verzeichnisbaum-Exporter** (10-15 Lektionen) Miniprojekt
101. 🧠 **Geteilte Statistik-Engine** (10-15 Lektionen) Miniprojekt
102. 📦 **Mini-Paketverwaltung (Lernprojekt)** (10-15 Lektionen) Miniprojekt

### 💼 Praxisnahe Business- & Firmenprojekte
103. 🧰 **Interne CLI für Deployment-Skripte** (10-15 Lektionen) Miniprojekt
104. 📜 **Git-Commit-Linter (Conventional Commits)** (10-15 Lektionen) Miniprojekt
105. 📝 **Changelog-Generator** (10-15 Lektionen) Miniprojekt
106. 🔍 **Lizenz-Compliance-Checker für Dependencies** (10-15 Lektionen) Miniprojekt
107. 📦 **Generische Retry/Backoff-Bibliothek** (10-15 Lektionen) Miniprojekt
108. 🚦 **Generische Rate-Limiter-Bibliothek** (10-15 Lektionen) Miniprojekt
109. 🧪 **Testdaten-Generator-Bibliothek** (10-15 Lektionen) Miniprojekt
110. 🔌 **Generisches API-Client-SDK** (10-15 Lektionen) Miniprojekt
111. 🗃️ **Interne Caching-Schicht (generisch)** (10-15 Lektionen) Miniprojekt
112. 🧩 **Plugin-System für ein Build-Tool** (10-15 Lektionen) Miniprojekt
113. 📊 **Log-Parser-Bibliothek (intern)** (10-15 Lektionen) Miniprojekt
114. 🧮 **Feature-Flag-SDK (Client-Bibliothek)** (10-15 Lektionen) Miniprojekt
115. 🧾 **Config-Validierungs-Tool** (10-15 Lektionen) Miniprojekt
116. 🏗️ **Interner Code-Qualitäts-Checker** (10-15 Lektionen) Miniprojekt
117. 📦 **Monorepo-Build-Orchestrator (Workspace)** (10-15 Lektionen) Miniprojekt
118. 🔐 **Interne Secrets-Zugriffsschicht (Typestate)** (10-15 Lektionen) Miniprojekt
119. 🧵 **Generischer Event-Dispatcher** (10-15 Lektionen) Miniprojekt
120. 📚 **Interne Dokumentations-Linter-Bibliothek** (10-15 Lektionen) Miniprojekt
