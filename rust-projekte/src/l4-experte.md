# 🔴 L4 Experte

Das letzte Level: Performance messen statt raten, Korrektheit durch Zufall statt nur per Beispiel prüfen, an die Grenzen der Sprache gehen — und das Ergebnis produktionsreif veröffentlichen.

| Thema | Was du lernst |
|---|---|
| ⚡ Benchmarking & Memory Profiling | `criterion`, Heap-/Allokations-Profiling |
| 🎲 Property-based Testing & Fuzzing | `proptest`, `cargo-fuzz` |
| ⚙️ Zero-Copy, Unsafe Rust, FFI | `unsafe`, rohe Zeiger, C-Interop |
| 🪄 Custom Makros | `macro_rules!`, Derive-/Attribute-Makros |
| 🌐 WebAssembly | `wasm-bindgen`, Rust im Browser |
| 📦 Crates.io Release & Production | Semver, Doku, CI, Veröffentlichung |

> **Hinweis:** Alle Projekte werden ohne fertige Code-Vorschläge begleitet. Erarbeite die Lösung eigenständig!

---

## 📜 100+ Projektvorschläge

### ⚡ Benchmarking & Memory Profiling
1. ⚡ **Such-Algorithmen-Benchmark-Suite**
2. 🧮 **Sortieralgorithmen-Vergleich**
3. 🧵 **String-Concat-Strategien-Benchmark**
4. 📦 **Collection-Wahl-Benchmark**
5. 🔢 **Zahlenparser-Benchmark**
6. 🧠 **Allokations-Profiling einer Pipeline**
7. 🌲 **Baumtraversierung-Benchmark**
8. 🔍 **Regex vs. manueller Parser**
9. 🧮 **Hash-Funktionen-Benchmark**
10. 📊 **Iterator-Ketten vs. manuelle Schleifen**
11. 🗃️ **Serialisierungs-Format-Benchmark**
12. 🧵 **Clone-vs-Reference-Benchmark**

### 🎲 Property-based Testing & Fuzzing
13. 🎲 **Property-getesteter Konfigurations-Parser**
14. 🧮 **Arithmetik-Parser-Fuzzing**
15. 🔤 **String-Encoder/Decoder-Property-Tests**
16. 📦 **Serialisierungs-Roundtrip-Tests**
17. 🧵 **Sortier-Invarianten-Tests**
18. 🌲 **Datenstruktur-Invarianten**
19. 🔍 **Such-Funktion-Fuzzing**
20. 🧮 **State-Machine-Property-Tests**
21. 📄 **Datei-Format-Parser-Fuzzing**
22. 🧪 **Regressions-Corpus-Aufbau**

### ⚙️ Zero-Copy, Unsafe Rust & FFI
23. ⚙️ **Zero-Copy Binary-Parser**
24. 🖼️ **Zero-Copy Bildformat-Reader**
25. 🔗 **C-Bibliotheks-Bindings**
26. 🧠 **Eigener einfacher Allocator (Lernprojekt)**
27. 📡 **Zero-Copy Netzwerkprotokoll-Parser**
28. 🧮 **SIMD-Experiment (portable_simd/unsafe)**
29. 🔌 **Rust-Bibliothek für C nutzbar machen**
30. 🧵 **Unsafe Zellen-Implementierung (Lernprojekt)**
31. 📦 **Zero-Copy CSV-Parser**
32. 🖥️ **Speicher-Layout-Inspektor**

### 🪄 Custom Makros
33. 🪄 **`#[derive(Builder)]`-Makro**
34. 🧾 **`hashmap!`-Literal-Makro**
35. 📐 **`#[derive(FromRow)]`-artiges Makro**
36. 🧮 **Assert-Makro-Familie**
37. 🔍 **Logging-Attribut-Makro**
38. 🧵 **`#[derive(Validate)]`-Makro**
39. 📦 **DSL-Makro für Testdaten**
40. 🎨 **`#[derive(Display)]`-Makro (eigene Variante)**
41. 🧮 **Rekursives Berechnungs-Makro**
42. 🏗️ **`#[derive(Default)]`-artiges Makro mit Zusatzlogik**

### 🌐 WebAssembly
43. 🌐 **Bildfilter im Browser**
44. 🧮 **WASM-Taschenrechner**
45. 🎮 **WASM-Mini-Spiel**
46. 📊 **WASM-Datenvisualisierung**
47. 🔐 **WASM-Hashing-Tool**
48. 🧵 **WASM-Textverarbeitung**
49. 🌲 **WASM-Baum-Visualisierer**
50. ⚡ **WASM-vs-JS-Performance-Vergleich**

### 📦 Crates.io Release & Production
51. 📦 **Eigene Utility-Crate veröffentlichen**
52. 📖 **Doku-getriebene Bibliothek**
53. 🔄 **Semver-Migrationsprojekt**
54. 🧪 **CI-Pipeline für eine Crate**
55. 📦 **Crate mit Feature-Flags**
56. 🔧 **Crate-Wartungs-Simulation**
57. 🌐 **Crate mit `no_std`-Unterstützung**
58. 📦 **Workspace-weite Release-Automatisierung**

### 🧩 Kombinierte Experten-Projekte
59. ⚡ **Benchmark-gestützter Parser mit Fuzzing-Absicherung**
60. ⚙️ **Zero-Copy-Parser als veröffentlichte Crate**
61. 🪄 **Derive-Makro-Crate mit Benchmarks**
62. 🌐 **WASM-Modul aus einer veröffentlichten Crate**
63. 🧪 **Property-getestete Kryptografie-Utility (Lernprojekt)**
64. ⚙️ **Unsafe Performance-Kern mit sicherer API**
65. 📦 **Produktionsreife CLI-Bibliothek**
66. 🧮 **Makro-generierte Testfälle**
67. 🌐 **WASM-Bibliothek mit Fuzzing-Historie**
68. ⚡ **Memory-optimierte Datenstruktur-Crate**
69. 🔗 **FFI-Bridge als veröffentlichte Crate**

### 🔁 Erweiterte Praxisprojekte
70. ⚡ **Kompressions-Algorithmen-Benchmark**
71. 🧮 **Numerische Stabilität-Tests**
72. ⚙️ **Zero-Copy Log-Parser**
73. 🪄 **Makro-basiertes Konfigurations-DSL**
74. 🌐 **WASM-Regex-Engine (Mini)**
75. 📦 **Crate-Vorlagen-Generator**
76. 🎲 **Fuzzing-Ziel: Eigener Deserializer**
77. ⚡ **Async-vs-Sync-Performance-Vergleich**
78. 🧠 **Speicher-Leak-Erkennung (Übung)**
79. 🔗 **FFI-Callback-Mechanismus**
80. 🪄 **Attribut-Makro für Metriken**
81. 🌐 **WASM-Bild-Kompressor**
82. 📦 **Interne Tooling-Crate veröffentlichen**
83. ⚡ **Parallelisierungs-Benchmark**
84. 🎲 **Property-Tests für einen Cache**
85. ⚙️ **Unsafe Ringpuffer-Implementierung**
86. 🪄 **Makro für wiederholte Trait-Implementierungen**
87. 🌐 **WASM-Sudoku-Löser**
88. 📦 **Versionierte Public API**
89. ⚡ **Startup-Zeit-Optimierung**
90. 🎲 **Fuzzing eines Command-Line-Parsers**
91. ⚙️ **Zero-Copy Template-Engine (Mini)**
92. 🪄 **Makro-generierter State-Machine-Code**
93. 🌐 **WASM-Passwort-Stärke-Checker**
94. 📦 **Lizenz- & Abhängigkeits-Audit-Tool**
95. ⚡ **Batch- vs. Streaming-Verarbeitung**
96. 🎲 **State-Machine-Fuzzing**
97. ⚙️ **Eigene `Vec`-ähnliche Collection (Lernprojekt)**
98. 🪄 **Codegenerierung für API-Clients**
99. 🌐 **WASM-Diagramm-Renderer**
100. 📦 **Vollständiger Release-Prozess (End-to-End)**
101. ⚡ **Cache-Effizienz-Experiment**
102. 🎯 **Abschlussprojekt: Gehärtete, benchmarkte, veröffentlichte Crate**

### 💼 Praxisnahe Business- & Firmenprojekte
103. 📉 **Performance-Regressions-Suite für eine Produktions-API**
104. 🏋️ **Eigenes Lasttest-Tool**
105. 🗄️ **Datenbank-Migrations-Tool mit Property-Tests**
106. 🔎 **Custom-Linter (Proc-Macro-basiert)**
107. 🧩 **WASM-Plugin-System für eine echte Anwendung**
108. 📦 **Interner Crate-Registry-Mirror**
109. 📋 **SBOM-Generator (Software Bill of Materials)**
110. 🔒 **Security-Audit-Tool für Abhängigkeiten**
111. 🏗️ **Derive-Makro für produktiven API-Client-Codegen**
112. 🔗 **FFI-Wrapper für eine reale C-Bibliothek (z. B. zlib)**
113. ⚡ **Benchmark-Suite für einen Kernalgorithmus**
114. 🎯 **Fuzzing-Harness für einen produktiven Parser**
115. 🧱 **WASM-Sandboxing für ein SaaS-Plugin-System**
116. 📦 **Automatisierte Crate-Publishing-Pipeline (intern)**
117. 🧮 **Property-Test-Suite für ein Abrechnungssystem**
118. 🔧 **Interne Build-Zeit-Optimierung (Profiling)**
119. 📊 **Produktions-Metriken-Bibliothek mit Benchmarks**
120. 🛡️ **Supply-Chain-Sicherheits-Check (cargo-audit-artig)**
