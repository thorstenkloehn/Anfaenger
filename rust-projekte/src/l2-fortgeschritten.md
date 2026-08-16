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

## 📜 60 Projektvorschläge

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

### 🗄️ Datenbank-Technik
25. 🗃️ **Generischer In-Memory-Store\<K, V\> (Trait `Repository`)** (nur die wichtigsten 10 Themen)
26. 🌲 **Einfacher B-Baum (Lernprojekt, Einfügen/Suchen)** (nur die wichtigsten 10 Themen)
27. 📇 **Index-Struktur mit HashMap (Sekundärindex)** (nur die wichtigsten 10 Themen)
28. 🔄 **Transaktions-Simulator (Commit/Rollback, einfach)** (nur die wichtigsten 10 Themen)
29. 🔍 **Query-Builder (Fluent API für Filter-Ketten)** (nur die wichtigsten 10 Themen)
30. 🧪 **Getestete Persistenz-Bibliothek (Serialisierung mit serde)** (nur die wichtigsten 10 Themen)
31. 🔌 **Plugin-fähiges Storage-Backend (Trait Objects: Memory/Datei)** (nur die wichtigsten 10 Themen)
32. 🔧 **Migrations-Tool (Schema-Versionen verwalten)** (nur die wichtigsten 10 Themen)
33. 🧵 **Geteilter Datenbank-Zustand (`Arc<RwLock<_>>`)** (nur die wichtigsten 10 Themen)
34. 📖 **Generischer Paginierungs-Iterator** (nur die wichtigsten 10 Themen)
35. ⚖️ **Constraint-Prüfung mit Trait-Bounds (Unique, NotNull)** (nur die wichtigsten 10 Themen)
36. 📦 **Datenbank-Workspace (Core, Query, CLI)** (nur die wichtigsten 10 Themen)

### 🧮 Eigene Parser & Compiler bauen
37. 🔤 **Generischer Tokenizer (Trait `Lexer`)** (nur die wichtigsten 10 Themen)
38. 🌳 **Rekursiver-Abstieg-Parser für Arithmetik (Klammern & Rangfolge)** (nur die wichtigsten 10 Themen)
39. 🧩 **AST-Datenstruktur (enum-basiert, per Pattern Matching ausgewertet)** (nur die wichtigsten 10 Themen)
40. 🧪 **Getesteter Lexer (Unit-Tests für Token-Erkennung)** (nur die wichtigsten 10 Themen)
41. ⚠️ **Fehlerbehandlung im Parser (Meldungen mit Position)** (nur die wichtigsten 10 Themen)
42. 🔌 **Plugin-fähiges Grammatik-System (Trait Objects für Regeln)** (nur die wichtigsten 10 Themen)
43. 📦 **Rekursiver JSON-Mini-Parser (eigene Implementierung)** (nur die wichtigsten 10 Themen)
44. 🚦 **Zustandsbasierter Lexer (Typestate für Lexer-Modi)** (nur die wichtigsten 10 Themen)
45. 🧱 **Parser-Kombinatoren (eigene, einfache Bausteine)** (nur die wichtigsten 10 Themen)
46. 🖨️ **AST-Pretty-Printer (Baum zurück in Text)** (nur die wichtigsten 10 Themen)
47. 📦 **Parser-Workspace (Lexer-Crate, Parser-Crate, CLI)** (nur die wichtigsten 10 Themen)
48. ❌ **Generischer Fehler-Typ (thiserror-ähnlicher Aufbau)** (nur die wichtigsten 10 Themen)

### 📰 CMS-Technik
49. 🔌 **Trait-basiertes Content-Repository (Mock- vs. Datei-Backend)** (nur die wichtigsten 10 Themen)
50. 📦 **CMS-Workspace (Core-, Storage-, CLI-Crate)** (nur die wichtigsten 10 Themen)
51. 🏗️ **Builder für Artikel-Erstellung (Titel, Tags, Status)** (nur die wichtigsten 10 Themen)
52. 🔁 **Generischer Renderer-Trait (Markdown, HTML, Plaintext)** (nur die wichtigsten 10 Themen)
53. 🧵 **Geteilter Artikel-Cache (`Arc<Mutex<_>>`)** (nur die wichtigsten 10 Themen)
54. 🧪 **Getestete Slug-Bibliothek (Unicode, Sonderzeichen)** (nur die wichtigsten 10 Themen)
55. 🔗 **Iterator-Kette für Artikel-Filterung (Tags, Datum, Status)** (nur die wichtigsten 10 Themen)
56. 📐 **Trait-Objekt-basiertes Plugin-System (Content-Transformer)** (nur die wichtigsten 10 Themen)
57. 🗃️ **Versionierungs-System für Artikel (Diff zwischen Revisionen)** (nur die wichtigsten 10 Themen)
58. 🔍 **Volltextsuche mit Index (`HashMap<Wort, Vec<ArtikelId>>`)** (nur die wichtigsten 10 Themen)
59. 🧩 **Template-Engine (einfache Platzhalter-Ersetzung, `{{titel}}`)** (nur die wichtigsten 10 Themen)
60. 📊 **Statistik-Modul (Artikel pro Autor/Tag, generisch aggregiert)** (nur die wichtigsten 10 Themen)
