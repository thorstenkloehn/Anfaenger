Die effektivste Methode gegen das Vergessen ist das Wiederholen von Lerninhalten in immer größer werdenden Zeitabständen (Spaced Repetition) – idealerweise kurz bevor das Gehirn die Information wieder löscht.

**Anki nutzen:** Erstelle dir Karteikarten (Flashcards) für die Programmiersprachen, die du gerade nicht aktiv verwendest.
**Was gehört auf die Karten?** Keine riesigen Codeblöcke, sondern kurze, prägnante Fragen und Antworten.

* **Beispiel:** „Wie erzwingt man in Rust, dass eine Variable veränderbar ist?“ -> `let mut x = 5;`
* **Beispiel:** „Welche Schlüsselwörter nutzt C# für asynchrone Methoden?“ -> `async` und `await`.

**Folgende Themenbereiche bieten sich in Rust an:**

* 🧱 **Variablen & Datentypen:** Zahlen, Texte, Mutabilität
* 🔀 **Kontrollfluss:** `if`/`else`, `loop`, `while`, `for`
* ⌨️ **Benutzereingabe:** Lesen von der Konsole, Konvertierung
* 🧠 **Ownership & Borrowing:** Wer besitzt was? Referenzen nutzen
* 📝 **String vs. &str:** Texte speichern, vergleichen, ausgeben

---

## 📇 Übersicht der phasenbasierten Anki-Dateien

Im Stammverzeichnis findest du für jede Phase eine eigene CSV-Datei im Format `Frage;Antwort` zum direkten Import in Anki:

| Datei | Phase & Thema |
| :--- | :--- |
| **`AnkiRust1.csv`** | **Phase 1:** Grundlagen, Datentypen, Ownership, `String` vs `&str` |
| **`AnkiRust2.csv`** | **Phase 2:** Structs, Methoden, Enums, Pattern Matching (`if let`) |
| **`AnkiRust3.csv`** | **Phase 3:** Collections (`Vec`, `HashMap`), `Option`/`Result`, Testing & Benchmarking |
| **`AnkiRust4.csv`** | **Phase 4:** Module, Crates, Cargo Workspaces, Features & Performance-Profile |
| **`AnkiRust5.csv`** | **Phase 5:** Generics, Traits & Lifetimes |
| **`AnkiRust6.csv`** | **Phase 6:** Smart Pointer (`Box`, `Rc`, `Arc`, `RefCell`), Deref & Drop |
| **`AnkiRust7.csv`** | **Phase 7:** Threads, Mutex, Channels, Async/Await & Tokio |
| **`AnkiRust8.csv`** | **Phase 8:** Closures (`FnMut`), Iteratoren (`map`, `filter`, `fold`) |
| **`AnkiRust9.csv`** | **Phase 9:** Systemprogrammierung, Unsafe Rust, FFI, C-ABI, `build.rs`, WASM & `#![no_std]` |
| **`AnkiRust10.csv`** | **Phase 10:** Metaprogrammierung, `macro_rules!`, Proc-Macros (`syn`/`quote`) |