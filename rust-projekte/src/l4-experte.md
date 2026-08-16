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

### 🧠 Wissenssysteme & Wissenstechnik
121. ⚡ **Volltextsuche-Algorithmen-Benchmark**
122. 🎲 **Property-Tests für Wissensgraph-Konsistenz**
123. ⚙️ **Zero-Copy-Parser für Wissens-Datenformate (z. B. Turtle/RDF)**
124. 🪄 **Derive-Makro für Wissens-Entity-Modelle**
125. 🌐 **WASM-Wissens-Viewer im Browser**
126. 📦 **Veröffentlichte Crate: Wissensgraph-Datenstruktur**
127. 🔍 **Invertierter Suchindex from scratch**
128. 🎯 **Fuzzing für Wissens-Import-Parser**
129. 🌲 **Graph-Traversierungs-Benchmark für Wissensgraphen**
130. 🧮 **Eigene Vektor-Ähnlichkeitssuche (Embeddings-Grundlagen)**
131. 🔬 **Semantic-Search-Prototyp (Unsafe-optimierte Distanzberechnung)**
132. 📦 **Produktionsreife Wissensgraph-Crate (Ende-zu-Ende)**

### 🧭 Expertensysteme & Expertensystem-Technik
133. ⚡ **Benchmark: Forward- vs. Backward-Chaining**
134. 🎲 **Property-Tests für Regel-Konsistenz (Widerspruchsfreiheit)**
135. ⚙️ **Zero-Copy-Parser für Regel-Dateien (eigene DSL)**
136. 🪄 **Custom-Makro für Regel-Definitionen (`rule! {}`)**
137. 🌐 **WASM-Expertensystem im Browser**
138. 📦 **Veröffentlichte Crate: generische Inferenz-Engine**
139. 🧮 **Eigener Constraint-Solver (einfach, from scratch)**
140. 🎯 **Fuzzing für Regel-Parser**
141. 🌲 **Graph-basierte Abhängigkeitsanalyse von Regeln (Benchmark)**
142. ⚙️ **Unsafe-optimierter Fakten-Speicher (Performance)**
143. 🌫️ **Property-getestetes Fuzzy-Logic-System**
144. 📦 **Produktionsreife Expertensystem-Crate (Ende-zu-Ende)**

### 🎓 LMS & Lernplattform-Technik
145. ⚡ **Benchmark: Quiz-Auswertungs-Algorithmen**
146. 🎲 **Property-Tests für Notenberechnung**
147. ⚙️ **Zero-Copy-Parser für Kursinhalte (SCORM-ähnliches Format)**
148. 🪄 **Custom-Makro für Kurs-Definitionen**
149. 🌐 **WASM-Quiz-Player im Browser**
150. 📦 **Veröffentlichte Crate: generische LMS-Kernbibliothek**
151. 🎯 **Fuzzing für Kurs-Import-Parser**
152. 🌲 **Graph-Benchmark für Lernpfad-Abhängigkeiten**
153. ⚙️ **Unsafe-optimierter Fortschritts-Speicher**
154. 🎲 **Property-getestetes Zertifikats-Validierungssystem**
155. 🌐 **WASM-Lernpfad-Visualisierer**
156. 📦 **Produktionsreife LMS-Crate (Ende-zu-Ende)**

### 🤖 Eigener KI-Agent & Agenten-Technik
157. ⚡ **Benchmark: Tool-Dispatch-Strategien**
158. 🎲 **Property-Tests für Agenten-Zustandsübergänge**
159. ⚙️ **Zero-Copy-Parser für Agenten-Protokoll (JSON-RPC-artig)**
160. 🪄 **Custom-Makro für Tool-Definitionen (`#[tool]`)**
161. 🌐 **WASM-Agent im Browser**
162. 📦 **Veröffentlichte Crate: generisches Agenten-Framework**
163. 🎯 **Fuzzing für Agenten-Kommando-Parser**
164. 🌲 **Graph-Benchmark für Multi-Agenten-Kommunikation**
165. ⚙️ **Unsafe-optimierter Nachrichten-Puffer**
166. 🎲 **Property-getestete Tool-Aufruf-Validierung**
167. 🌐 **WASM-Agenten-Debugger/Visualisierer**
168. 📦 **Produktionsreifes Agenten-Framework (Ende-zu-Ende)**
169. ⚡ **Benchmark: Speicher-Strategien für Agenten-Gedächtnis (Vec vs. HashMap vs. Ring-Buffer)**
170. 🎲 **Property-Tests für Tool-Retry-Logik (Idempotenz)**
171. ⚙️ **Zero-Copy-Parser für Streaming-Antworten (Chunked-Format)**
172. 🪄 **Derive-Makro für Agenten-Konfiguration (`#[derive(AgentConfig)]`)**
173. 🌐 **WASM-Sandbox für Tool-Ausführung im Browser**
174. 📦 **Veröffentlichte Crate: Tokenizer-Bibliothek für Agenten**
175. 🎯 **Fuzzing für Streaming-Antwort-Parser**
176. 🌲 **Graph-Benchmark für Agenten-Abhängigkeitsketten (Tool-Chains)**
177. ⚙️ **Unsafe-optimierter Ring-Buffer für Agenten-Ereignisse**
178. 🎲 **Property-getestete Kosten-Kalkulation (Token-Zähler)**
179. 🌐 **WASM-Multi-Agenten-Simulator im Browser**
180. 📦 **Produktionsreifes verteiltes Agenten-System (Ende-zu-Ende)**

### 📖 LLM-Wiki-Pattern (Karpathy-Muster) & Wiki-Technik
181. ⚡ **Benchmark: Diff-Algorithmen (Myers vs. naiv)**
182. 🎲 **Property-Tests für Merge-Konsistenz**
183. ⚙️ **Zero-Copy-Parser für Wiki-Markup**
184. 🪄 **Custom-Makro für Artikel-Metadaten (`#[derive(WikiPage)]`)**
185. 🌐 **WASM-Diff-Viewer im Browser**
186. 📦 **Veröffentlichte Crate: generische Diff/Merge-Bibliothek**
187. 🎯 **Fuzzing für Wiki-Markup-Parser**
188. 🌲 **Graph-Benchmark für Revisions-Historie (Traversierung)**
189. ⚙️ **Unsafe-optimierter Text-Puffer für große Artikel**
190. 🎲 **Property-getestete Zitat-Validierung**
191. 🌐 **WASM-Revisions-Historie-Visualisierer**
192. 📦 **Produktionsreife Wiki-Engine-Crate (Ende-zu-Ende)**
