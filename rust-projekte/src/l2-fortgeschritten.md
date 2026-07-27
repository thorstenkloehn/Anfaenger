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
1. 📊 **Verkaufsdaten-Analyzer**
2. 🎓 **Notenauswertung**
3. 🧹 **Text-Bereiniger-Pipeline**
4. 🛒 **Warenkorb-Filter**
5. 🎯 **Highscore-Top-N**
6. 📬 **E-Mail-Validator-Batch**
7. 🧮 **Statistik-Toolkit**
8. 🔁 **Duplikat-Entferner**
9. 🧾 **Rechnungsposten-Gruppierer**
10. 🎵 **Playlist-Shuffler mit Filter**
11. 🏭 **Sensor-Ausreißer-Filter**
12. 🧑‍🤝‍🧑 **Team-Einteiler (Closure als Kriterium)**
13. 📚 **Bücher-nach-Autor-Gruppierung**
14. 🌡️ **Temperaturreihen-Glätter**
15. 🎮 **Highscore-Rang-Ermittler**
16. 🧵 **Lazy-Pipeline-Demonstrator**

### 🧪 Testing & Tooling
17. 🧪 **Testgetriebene String-Utils**
18. 📐 **Geometrie-Bibliothek mit Doctests**
19. 🧮 **Getestete Mathe-Bibliothek**
20. 🔤 **Parser mit Regressionstests**
21. 🧹 **Clippy-Sauberes CLI-Tool**
22. 🎨 **Rustfmt-Konventions-Check**
23. 📖 **Dokumentierte Utility-Crate**
24. 🧪 **Property-nahe Beispieltests**
25. 🧯 **Panic-Verhalten testen**
26. 🧮 **Testabdeckung erhöhen**
27. 🗃️ **Test-Fixtures-Bibliothek**
28. 🔍 **Integrationstests-Verzeichnis**
29. 🧪 **Benchmark-Vorstufe mit `#[test]`**
30. 🧾 **CI-Checkliste-Projekt**

### 🧬 Generics, Traits & Typestate
31. 🚪 **Typestate-Tür**
32. 🌐 **Typestate-Netzwerkverbindung**
33. 📦 **Generischer Stapel (Stack\<T\>)**
34. 🔁 **Generische Warteschlange (Queue\<T\>)**
35. 🧮 **Generischer Statistik-Container**
36. 🧾 **Trait `Rechnung`**
37. 🍔 **Typestate-Bestellung**
38. 🔐 **Typestate-Login-Fluss**
39. 📐 **Generisches Vergleichs-Utility**
40. 🧵 **Trait `Formatierbar`**
41. 🚦 **Typestate-Ampel**
42. 🧮 **Generischer Cache\<K, V\>**
43. 🏗️ **Builder mit Typestate**
44. 🎒 **Generisches Inventar\<Item\>**
45. 🔄 **Trait `Konvertierbar`**
46. 📊 **Generische Aggregations-Funktion**

### 🎭 Trait Objects vs. statische Generics
47. 🎨 **Plugin-System für Textfilter**
48. 🔊 **Audio-Effekt-Kette**
49. 🖼️ **Formen-Renderer**
50. 🧮 **Strategie-Muster: Sortieralgorithmen**
51. 🔔 **Benachrichtigungs-Kanäle**
52. 🧾 **Rabatt-Strategien**
53. 🎮 **Gegner-KI-Verhalten**
54. ⚙️ **Statisch vs. dynamisch: Performance-Vergleich**
55. 🧩 **Middleware-Kette**
56. 🎭 **Command-Pattern mit Trait Objects**
57. 🧪 **Validierungs-Regelketten**
58. 🖨️ **Export-Formate (Trait Object)**
59. 🧮 **Generischer vs. dynamischer Taschenrechner**
60. 🎨 **Theme-System**

### 📦 Cargo Workspaces & Modularisierung
61. 📦 **Multi-Crate CLI-Tool**
62. 🧮 **Mathe-Bibliothek + Test-Crate**
63. 🌐 **Geteilte Datentypen-Crate**
64. 🏗️ **Plugin-Workspace**
65. 🧾 **Rechnungssystem als Workspace**
66. 📚 **Bibliotheksverwaltung als Workspace**
67. 🔧 **Gemeinsame Utility-Crate**
68. 🎮 **Spiel-Engine-Workspace**
69. 🧪 **Workspace mit gemeinsamer Test-Utility-Crate**
70. 📦 **Feature-Flag-Experiment im Workspace**

### 🧠 Smart Pointers (Box, Rc, Arc, RefCell)
71. 🌳 **Interaktiver Ordnerbaum**
72. 🔗 **Verkettete Liste (Box\<T\>)**
73. 🕸️ **Beobachter-Muster mit `Rc`**
74. 🧮 **Geteilter Zähler**
75. 🌲 **Binärbaum mit `Box`**
76. 🧾 **Geteilte Konfiguration**
77. 🔄 **Zyklen-Falle demonstrieren**
78. 🧵 **Vorbereitung auf Concurrency: `Arc\<Mutex\<T\>\>`**
79. 🗂️ **Geteilter Cache zwischen Komponenten**
80. 🧩 **Graph mit `Rc`-Kanten**
81. 📋 **Undo-Historie mit `Box`**
82. 🌐 **Geteilter Zustand in einem Text-Adventure**

### 🧩 Kombinierte Profi-Projekte
83. 📚 **Bibliotheks-Engine**
84. 🎮 **Modulares Spiele-Framework**
85. 🧾 **Buchhaltungs-Bibliothek**
86. 🔌 **Erweiterbares Export-System**
87. 🧠 **Zustandsmaschine mit Typestate + Smart Pointers**
88. 🧪 **TDD-Iterator-Bibliothek**
89. 🎭 **Simulierte Event-Bus-Architektur**
90. 📦 **Konfigurierbare Pipeline-Bibliothek**
91. 🌳 **Dateisystem-Simulator**
92. 🧮 **Generischer Event-Aggregator**
93. 🎨 **Plugin-fähiger Text-Editor (Kern)**
94. 🔐 **Typestate-Auth-Bibliothek**
95. 🧵 **Geteilter Konfigurationsspeicher**
96. 🏗️ **Builder-Bibliothek mit Trait-Bounds**
97. 🧾 **Rechnungs-Pipeline**
98. 🎮 **Highscore-Service als Mini-Crate**
99. 🧩 **Middleware-Framework (Mini)**
100. 🌲 **Verzeichnisbaum-Exporter**
101. 🧠 **Geteilte Statistik-Engine**
102. 📦 **Mini-Paketverwaltung (Lernprojekt)**

### 💼 Praxisnahe Business- & Firmenprojekte
103. 🧰 **Interne CLI für Deployment-Skripte**
104. 📜 **Git-Commit-Linter (Conventional Commits)**
105. 📝 **Changelog-Generator**
106. 🔍 **Lizenz-Compliance-Checker für Dependencies**
107. 📦 **Generische Retry/Backoff-Bibliothek**
108. 🚦 **Generische Rate-Limiter-Bibliothek**
109. 🧪 **Testdaten-Generator-Bibliothek**
110. 🔌 **Generisches API-Client-SDK**
111. 🗃️ **Interne Caching-Schicht (generisch)**
112. 🧩 **Plugin-System für ein Build-Tool**
113. 📊 **Log-Parser-Bibliothek (intern)**
114. 🧮 **Feature-Flag-SDK (Client-Bibliothek)**
115. 🧾 **Config-Validierungs-Tool**
116. 🏗️ **Interner Code-Qualitäts-Checker**
117. 📦 **Monorepo-Build-Orchestrator (Workspace)**
118. 🔐 **Interne Secrets-Zugriffsschicht (Typestate)**
119. 🧵 **Generischer Event-Dispatcher**
120. 📚 **Interne Dokumentations-Linter-Bibliothek**
