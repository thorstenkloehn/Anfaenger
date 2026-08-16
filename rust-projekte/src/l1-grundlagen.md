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

## 📜 60 Projektvorschläge

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

### 🗄️ Datenbank-Technik
25. 🗃️ **Datensatz-Speicher (`Vec<Struct>`, CRUD in Konsole)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
26. 🔑 **Primärschlüssel-Generator (fortlaufende ID)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
27. 📋 **Einfache Tabellen-Simulation (`Vec<HashMap>`)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
28. 📄 **CSV-Datenbank-Reader (Zeilen als Datensätze)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
29. 💾 **Einfacher Datei-basierter Speicher (Speichern/Laden)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
30. 🪞 **Duplikat-Prüfer (Eindeutigkeit von Schlüsseln)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
31. 🔀 **Sortier-Tool für Datensätze (nach Feld)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
32. 🔎 **Filter-Abfrage-Tool (WHERE-ähnlich, einfach)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
33. 💽 **Backup-Tool (Datei kopieren, simuliert)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
34. ✅ **Datensatz-Validierungs-Tool (Pflichtfelder)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
35. 🔗 **Einfache Beziehungs-Simulation (Fremdschlüssel als ID-Referenz)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
36. 📜 **Änderungs-Historie für Datensätze (einfaches Log)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)

### 🧮 Eigene Parser & Compiler bauen
37. 🧮 **Einfacher Taschenrechner-Parser (nur + und -)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
38. 🔗 **Klammer-Prüfer (Balanced Parentheses)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
39. 📄 **CSV-Zeilen-Parser (eigene Implementierung ohne Crate)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
40. ✂️ **Einfacher Tokenizer (Text in Wörter/Zahlen zerlegen)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
41. ⌨️ **Kommandozeilen-Argument-Parser (einfach, ohne clap)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
42. ⚙️ **Konfigurationsdatei-Parser (Key=Value-Format)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
43. ➗ **Mathematischer Ausdrucks-Auswerter (Punkt-vor-Strich)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
44. 📡 **Morsecode-Parser (Text ↔ Morse)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
45. 📅 **Datum-Format-Parser (String → Struct)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
46. 🖍️ **Einfacher Markup-Parser (Bold/Italic-Tags erkennen)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
47. 🔗 **URL-Parser (Schema, Host, Pfad zerlegen)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
48. 🔢 **Zahlen-Format-Erkenner (Int/Float/Hex unterscheiden)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)

### 📰 CMS-Technik
49. 📄 **Artikel-Struct (Titel, Inhalt, Autor, Datum)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
50. 🗂️ **Artikel-Verwaltung (Vec, hinzufügen/löschen/auflisten)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
51. 🔍 **Artikel-Suche (Titel/Inhalt nach Stichwort durchsuchen)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
52. 🏷️ **Tag-System (Artikel mit Schlagwörtern versehen)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
53. 📅 **Artikel nach Datum sortieren** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
54. ✂️ **Textauszug-Generator (Vorschau-Text aus Artikelinhalt)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
55. 🔢 **Wortzähler & Lesezeit-Schätzer für Artikel** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
56. 📁 **Artikel in Datei speichern & laden (`std::fs`, einfaches Textformat)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
57. 🌐 **Slug-Generator (Titel → URL-freundlicher String)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
58. 👤 **Autoren-Verwalter (Struct mit Name, zugeordneten Artikeln)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
59. 📝 **Einfacher Markdown-Formatierer (`**fett**`, `*kursiv*` erkennen)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
60. 🗓️ **Veröffentlichungs-Planer (Artikel-Status: Entwurf/Veröffentlicht)** (Kapitel 1: alle Themen von L1 zusammenführen; weitere Kapitel: L2, sortiert)
