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

## 📜 132 Projektvorschläge

### 🧠 Wissenssysteme & Wissenstechnik
1. ⚡ **Volltextsuche-Algorithmen-Benchmark**
2. 🎲 **Property-Tests für Wissensgraph-Konsistenz**
3. ⚙️ **Zero-Copy-Parser für Wissens-Datenformate (z. B. Turtle/RDF)**
4. 🪄 **Derive-Makro für Wissens-Entity-Modelle**
5. 🌐 **WASM-Wissens-Viewer im Browser**
6. 📦 **Veröffentlichte Crate: Wissensgraph-Datenstruktur**
7. 🔍 **Invertierter Suchindex from scratch**
8. 🎯 **Fuzzing für Wissens-Import-Parser**
9. 🌲 **Graph-Traversierungs-Benchmark für Wissensgraphen**
10. 🧮 **Eigene Vektor-Ähnlichkeitssuche (Embeddings-Grundlagen)**
11. 🔬 **Semantic-Search-Prototyp (Unsafe-optimierte Distanzberechnung)**
12. 📦 **Produktionsreife Wissensgraph-Crate (Ende-zu-Ende)**

### 🧭 Expertensysteme & Expertensystem-Technik
13. ⚡ **Benchmark: Forward- vs. Backward-Chaining**
14. 🎲 **Property-Tests für Regel-Konsistenz (Widerspruchsfreiheit)**
15. ⚙️ **Zero-Copy-Parser für Regel-Dateien (eigene DSL)**
16. 🪄 **Custom-Makro für Regel-Definitionen (`rule! {}`)**
17. 🌐 **WASM-Expertensystem im Browser**
18. 📦 **Veröffentlichte Crate: generische Inferenz-Engine**
19. 🧮 **Eigener Constraint-Solver (einfach, from scratch)**
20. 🎯 **Fuzzing für Regel-Parser**
21. 🌲 **Graph-basierte Abhängigkeitsanalyse von Regeln (Benchmark)**
22. ⚙️ **Unsafe-optimierter Fakten-Speicher (Performance)**
23. 🌫️ **Property-getestetes Fuzzy-Logic-System**
24. 📦 **Produktionsreife Expertensystem-Crate (Ende-zu-Ende)**

### 🎓 LMS & Lernplattform-Technik
25. ⚡ **Benchmark: Quiz-Auswertungs-Algorithmen**
26. 🎲 **Property-Tests für Notenberechnung**
27. ⚙️ **Zero-Copy-Parser für Kursinhalte (SCORM-ähnliches Format)**
28. 🪄 **Custom-Makro für Kurs-Definitionen**
29. 🌐 **WASM-Quiz-Player im Browser**
30. 📦 **Veröffentlichte Crate: generische LMS-Kernbibliothek**
31. 🎯 **Fuzzing für Kurs-Import-Parser**
32. 🌲 **Graph-Benchmark für Lernpfad-Abhängigkeiten**
33. ⚙️ **Unsafe-optimierter Fortschritts-Speicher**
34. 🎲 **Property-getestetes Zertifikats-Validierungssystem**
35. 🌐 **WASM-Lernpfad-Visualisierer**
36. 📦 **Produktionsreife LMS-Crate (Ende-zu-Ende)**

### 🤖 Eigener KI-Agent & Agenten-Technik
37. ⚡ **Benchmark: Tool-Dispatch-Strategien**
38. 🎲 **Property-Tests für Agenten-Zustandsübergänge**
39. ⚙️ **Zero-Copy-Parser für Agenten-Protokoll (JSON-RPC-artig)**
40. 🪄 **Custom-Makro für Tool-Definitionen (`#[tool]`)**
41. 🌐 **WASM-Agent im Browser**
42. 📦 **Veröffentlichte Crate: generisches Agenten-Framework**
43. 🎯 **Fuzzing für Agenten-Kommando-Parser**
44. 🌲 **Graph-Benchmark für Multi-Agenten-Kommunikation**
45. ⚙️ **Unsafe-optimierter Nachrichten-Puffer**
46. 🎲 **Property-getestete Tool-Aufruf-Validierung**
47. 🌐 **WASM-Agenten-Debugger/Visualisierer**
48. 📦 **Produktionsreifes Agenten-Framework (Ende-zu-Ende)**
49. ⚡ **Benchmark: Speicher-Strategien für Agenten-Gedächtnis (Vec vs. HashMap vs. Ring-Buffer)**
50. 🎲 **Property-Tests für Tool-Retry-Logik (Idempotenz)**
51. ⚙️ **Zero-Copy-Parser für Streaming-Antworten (Chunked-Format)**
52. 🪄 **Derive-Makro für Agenten-Konfiguration (`#[derive(AgentConfig)]`)**
53. 🌐 **WASM-Sandbox für Tool-Ausführung im Browser**
54. 📦 **Veröffentlichte Crate: Tokenizer-Bibliothek für Agenten**
55. 🎯 **Fuzzing für Streaming-Antwort-Parser**
56. 🌲 **Graph-Benchmark für Agenten-Abhängigkeitsketten (Tool-Chains)**
57. ⚙️ **Unsafe-optimierter Ring-Buffer für Agenten-Ereignisse**
58. 🎲 **Property-getestete Kosten-Kalkulation (Token-Zähler)**
59. 🌐 **WASM-Multi-Agenten-Simulator im Browser**
60. 📦 **Produktionsreifes verteiltes Agenten-System (Ende-zu-Ende)**

### 📖 LLM-Wiki-Pattern (Karpathy-Muster) & Wiki-Technik
61. ⚡ **Benchmark: Diff-Algorithmen (Myers vs. naiv)**
62. 🎲 **Property-Tests für Merge-Konsistenz**
63. ⚙️ **Zero-Copy-Parser für Wiki-Markup**
64. 🪄 **Custom-Makro für Artikel-Metadaten (`#[derive(WikiPage)]`)**
65. 🌐 **WASM-Diff-Viewer im Browser**
66. 📦 **Veröffentlichte Crate: generische Diff/Merge-Bibliothek**
67. 🎯 **Fuzzing für Wiki-Markup-Parser**
68. 🌲 **Graph-Benchmark für Revisions-Historie (Traversierung)**
69. ⚙️ **Unsafe-optimierter Text-Puffer für große Artikel**
70. 🎲 **Property-getestete Zitat-Validierung**
71. 🌐 **WASM-Revisions-Historie-Visualisierer**
72. 📦 **Produktionsreife Wiki-Engine-Crate (Ende-zu-Ende)**

### 🔍 RAG & Vektorsuche
73. ⚡ **Benchmark: lineare vs. angenäherte Vektorsuche (HNSW-artig)**
74. 🎲 **Property-Tests für Ähnlichkeits-Invarianten (Symmetrie, Normierung)**
75. ⚙️ **Zero-Copy-Parser für Embedding-Dateien (Binärformat)**
76. 🪄 **Custom-Makro für Embedding-Structs (`#[derive(Embeddable)]`)**
77. 🌐 **WASM-Vektorsuche im Browser**
78. 📦 **Veröffentlichte Crate: generische Vektor-Index-Bibliothek**
79. 🎯 **Fuzzing für Embedding-Datei-Parser**
80. 🌲 **Graph-Benchmark für Cluster-Traversierung (Nächste-Nachbarn-Graph)**
81. ⚙️ **Unsafe-optimierte SIMD-Kosinus-Ähnlichkeit**
82. 🎲 **Property-getestete Chunking-Konsistenz (keine Datenverluste)**
83. 🌐 **WASM-Embedding-Visualisierer (2D-Projektion)**
84. 📦 **Produktionsreife RAG-Engine-Crate (Ende-zu-Ende)**

### 🔌 MCP (Model Context Protocol) & Tool-Technik
85. ⚡ **Benchmark: Transport-Strategien (stdio vs. HTTP)**
86. 🎲 **Property-Tests für Protokoll-Konformität (Schema-Konsistenz)**
87. ⚙️ **Zero-Copy-Parser für JSON-RPC-Nachrichten**
88. 🪄 **Custom-Makro für Tool-Definitionen (`#[mcp_tool]`)**
89. 🌐 **WASM-MCP-Client im Browser**
90. 📦 **Veröffentlichte Crate: generisches MCP-Server-Framework**
91. 🎯 **Fuzzing für MCP-Nachrichten-Parser**
92. 🌲 **Graph-Benchmark für Multi-Server-Orchestrierung**
93. ⚙️ **Unsafe-optimierter Nachrichten-Puffer für hohen Durchsatz**
94. 🎲 **Property-getestete Capability-Verhandlung**
95. 🌐 **WASM-MCP-Debugger/Visualisierer**
96. 📦 **Produktionsreifes MCP-Server-Framework (Ende-zu-Ende)**

### 🗄️ Datenbank-Technik
97. ⚡ **Benchmark: B-Baum vs. Hash-Index**
98. 🎲 **Property-Tests für Transaktions-Isolation**
99. ⚙️ **Zero-Copy-Parser für ein eigenes Datenbankformat**
100. 🪄 **Custom-Makro für ORM-artiges Mapping (`#[derive(Table)]`)**
101. 🌐 **WASM-Mini-Datenbank im Browser**
102. 📦 **Veröffentlichte Crate: eigene Embedded-Key-Value-Engine**
103. 🎯 **Fuzzing für Query-Parser**
104. 🌲 **Graph-Benchmark für Join-Strategien**
105. ⚙️ **Unsafe-optimiertes Speicher-Layout für Zeilen (Column-Store-Experiment)**
106. 🎲 **Property-getestete WAL-Konsistenz (Write-Ahead-Log, Lernprojekt)**
107. 🌐 **WASM-Query-Plan-Visualisierer**
108. 📦 **Produktionsreife Embedded-Datenbank-Crate (Ende-zu-Ende)**

### 🧮 Eigene Parser & Compiler bauen
109. ⚡ **Benchmark: rekursiver Abstieg vs. Parser-Kombinatoren**
110. 🎲 **Property-Tests für Parser-Roundtrip (Parse → Pretty-Print → Parse)**
111. ⚙️ **Zero-Copy-Lexer (ohne String-Allokationen)**
112. 🪄 **Custom-Makro für Grammatik-Regeln (DSL für Parser-Definition)**
113. 🌐 **WASM-Compiler-Playground im Browser**
114. 📦 **Veröffentlichte Crate: generische Parser-Kombinator-Bibliothek**
115. 🎯 **Fuzzing für den eigenen Parser**
116. 🌲 **Graph-Benchmark für AST-Traversierung (Optimierungspässe)**
117. ⚙️ **Unsafe-optimierte Bytecode-VM (Performance)**
118. 🎲 **Property-getestete Typprüfung (Soundness einfacher Regeln)**
119. 🌐 **WASM-AST-Visualisierer**
120. 📦 **Produktionsreifer eigener Compiler/Interpreter (Ende-zu-Ende)**

### 📰 CMS-Technik
121. ⚡ **Benchmark: Template-Rendering-Strategien (String-Concat vs. Writer)**
122. 🎲 **Property-Tests für Markdown-Parser-Konsistenz**
123. ⚙️ **Zero-Copy-Content-Parser (Lernprojekt, `&str`-Slices statt Allokation)**
124. 🪄 **Custom-Makro für Content-Modell-Generierung (`#[derive(ContentType)]`)**
125. 🌐 **WASM-Live-Vorschau-Editor im Browser**
126. 📦 **Veröffentlichte Crate: generische Template-Engine-Bibliothek**
127. 🎯 **Fuzzing für den eigenen Markdown-/Content-Parser**
128. 🌲 **Graph-Benchmark für Content-Verlinkungs-Struktur (Backlinks)**
129. ⚙️ **Unsafe-optimierter Puffer für große Content-Exporte**
130. 🎲 **Property-getestete Versionierungs-/Diff-Logik**
131. 🌐 **WASM-Rendering-Vergleich (Server-Side vs. Client-Side)**
132. 📦 **Produktionsreifes Mini-CMS (Ende-zu-Ende)**
