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

## 📜 60 Projektvorschläge

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

### 🗄️ Datenbank-Technik
25. ⚡ **Benchmark: B-Baum vs. Hash-Index**
26. 🎲 **Property-Tests für Transaktions-Isolation**
27. ⚙️ **Zero-Copy-Parser für ein eigenes Datenbankformat**
28. 🪄 **Custom-Makro für ORM-artiges Mapping (`#[derive(Table)]`)**
29. 🌐 **WASM-Mini-Datenbank im Browser**
30. 📦 **Veröffentlichte Crate: eigene Embedded-Key-Value-Engine**
31. 🎯 **Fuzzing für Query-Parser**
32. 🌲 **Graph-Benchmark für Join-Strategien**
33. ⚙️ **Unsafe-optimiertes Speicher-Layout für Zeilen (Column-Store-Experiment)**
34. 🎲 **Property-getestete WAL-Konsistenz (Write-Ahead-Log, Lernprojekt)**
35. 🌐 **WASM-Query-Plan-Visualisierer**
36. 📦 **Produktionsreife Embedded-Datenbank-Crate (Ende-zu-Ende)**

### 🧮 Eigene Parser & Compiler bauen
37. ⚡ **Benchmark: rekursiver Abstieg vs. Parser-Kombinatoren**
38. 🎲 **Property-Tests für Parser-Roundtrip (Parse → Pretty-Print → Parse)**
39. ⚙️ **Zero-Copy-Lexer (ohne String-Allokationen)**
40. 🪄 **Custom-Makro für Grammatik-Regeln (DSL für Parser-Definition)**
41. 🌐 **WASM-Compiler-Playground im Browser**
42. 📦 **Veröffentlichte Crate: generische Parser-Kombinator-Bibliothek**
43. 🎯 **Fuzzing für den eigenen Parser**
44. 🌲 **Graph-Benchmark für AST-Traversierung (Optimierungspässe)**
45. ⚙️ **Unsafe-optimierte Bytecode-VM (Performance)**
46. 🎲 **Property-getestete Typprüfung (Soundness einfacher Regeln)**
47. 🌐 **WASM-AST-Visualisierer**
48. 📦 **Produktionsreifer eigener Compiler/Interpreter (Ende-zu-Ende)**

### 📰 CMS-Technik
49. ⚡ **Benchmark: Template-Rendering-Strategien (String-Concat vs. Writer)**
50. 🎲 **Property-Tests für Markdown-Parser-Konsistenz**
51. ⚙️ **Zero-Copy-Content-Parser (Lernprojekt, `&str`-Slices statt Allokation)**
52. 🪄 **Custom-Makro für Content-Modell-Generierung (`#[derive(ContentType)]`)**
53. 🌐 **WASM-Live-Vorschau-Editor im Browser**
54. 📦 **Veröffentlichte Crate: generische Template-Engine-Bibliothek**
55. 🎯 **Fuzzing für den eigenen Markdown-/Content-Parser**
56. 🌲 **Graph-Benchmark für Content-Verlinkungs-Struktur (Backlinks)**
57. ⚙️ **Unsafe-optimierter Puffer für große Content-Exporte**
58. 🎲 **Property-getestete Versionierungs-/Diff-Logik**
59. 🌐 **WASM-Rendering-Vergleich (Server-Side vs. Client-Side)**
60. 📦 **Produktionsreifes Mini-CMS (Ende-zu-Ende)**
