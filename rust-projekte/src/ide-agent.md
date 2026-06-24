# 🤖 IDE KI-Agenten – Die nächste Generation

*Wenn der Editor denkt, plant und handelt – nicht nur vorschlägt.*

---

Während klassische Assistenten wie GitHub Copilot **reagieren** (auf deinen Cursor, deinen Kommentar, deinen Tastendruck), gehen **IDE KI-Agenten** einen entscheidenden Schritt weiter: Sie **handeln**.

Ein IDE KI-Agent kann Dateien öffnen, Terminal-Befehle ausführen, Fehler analysieren, Refactoring über mehrere Dateien hinweg durchführen und dabei immer im Blick behalten, was dein Projekt insgesamt braucht.

In dieser Lektion lernen wir, was IDE KI-Agenten ausmacht, wie wir sie beim Rust-Lernen sinnvoll einsetzen – und welche 50 Projekte sich besonders gut dafür eignen.

> **Für Anfänger:** Ein IDE KI-Agent ist wie ein erfahrener Programmierkollege, der neben dir sitzt. Er kann selbstständig nachschauen, ausprobieren und Fehler beheben – aber du gibst immer die Richtung vor.

---

## 🧠 Theorie: Was ist ein IDE KI-Agent?

### Der Unterschied: Assistent vs. Agent

| | Assistent (z. B. Copilot) | Agent (z. B. Cursor, Antigravity IDE) |
|---|---|---|
| **Arbeitsmodus** | Reaktiv (wartet auf dich) | Proaktiv (handelt selbst) |
| **Kontext** | Aktuelle Datei | Gesamtes Projekt |
| **Dateizugriff** | ❌ Nur sehen | ✅ Lesen & schreiben |
| **Terminal** | ❌ Nein | ✅ Ja |
| **Mehrere Dateien** | ❌ Nein | ✅ Ja |
| **Planung** | ❌ Nein | ✅ Erklärt zuerst, was er tun will |
| **Fehlerkorrektur** | ❌ Nur Vorschlag | ✅ Führt Korrekturen aus |

**Die entscheidende Frage:** Wann will ich, dass die KI **nur vorschlägt** (Assistent), und wann soll sie **selbst handeln** (Agent)?

---

### Bekannte IDE KI-Agenten (2025/2026)

| Tool | Basis-Editor | Besonderheit |
|---|---|---|
| **Cursor** | VS Code | KI-first, Composer für Projektänderungen |
| **Windsurf** | VS Code | Cascade – Kontextbewusstsein über gesamtes Projekt |
| **Antigravity IDE** | VS Code | Agent + Skills + AGENTS.md-Integration |
| **Zed** | Eigener Editor | Sehr schnell, KI als Kernfunktion |
| **JetBrains AI** | IntelliJ/CLion | Tiefe IDE-Integration für Rust |

---

### 🔍 Wie arbeitet ein IDE KI-Agent in Rust?

Ein typischer Workflow mit einem IDE-Agenten:

```
Du:    „Füge Fehlerbehandlung zu allen Funktionen in src/ hinzu"
           ↓
Agent: „Ich werde folgende Änderungen vornehmen:
        - main.rs: Zeile 12 – unwrap() durch ? ersetzen
        - utils.rs: Zeile 8 – Rückgabetyp auf Result<> ändern
        Soll ich fortfahren?"
           ↓
Du:    „Ja"
           ↓
Agent: Führt Änderungen in beiden Dateien aus, zeigt Diff
```

Das ist **komplett anders** als Copilot: Der Agent plant, erklärt und führt aus – nicht nur eine Zeile, sondern ein ganzes Vorhaben.

---

### 🧩 Typische Agent-Funktionen im IDE-Kontext

#### 1. Planungsmodus (Plan before Act)
Der Agent erklärt **erst**, was er tun will, bevor er es tut.  
Das gibt dir die Kontrolle und hilft dir, die Änderungen zu verstehen.

#### 2. Diff-Ansicht
Jede Änderung wird rot/grün angezeigt – exakt wie in Git.  
Du kannst Änderungen einzeln annehmen oder ablehnen.

#### 3. Multi-File-Bearbeitung
Der Agent kann gleichzeitig in `main.rs`, `lib.rs` und `Cargo.toml` arbeiten.  
Das ist für größere Refactorings unerlässlich.

#### 4. Terminal-Integration
Der Agent führt `cargo build`, `cargo test` oder `cargo clippy` aus – und interpretiert die Ergebnisse.

#### 5. Kontextfenster
Moderne Agenten „sehen" das gesamte Projekt (alle Dateien, Projektstruktur, Fehlerausgaben).

---

### 🛡️ Wichtige Prinzipien beim Umgang mit IDE-Agenten

**Als Anfänger besonders wichtig:**

1. **Immer Planungsmodus aktivieren** – Verstehe, was der Agent vorhat, bevor er handelt.
2. **Jede Änderung lesen** – Der Diff ist dein bestes Lernwerkzeug.
3. **Rückgängig machen üben** – `Ctrl+Z` oder Git `git revert` retten dich.
4. **Kleine Schritte bevorzugen** – Lieber 5 kleine Aufgaben als eine große.
5. **Fragen stellen** – „Erkläre mir diese Änderung" ist immer erlaubt.

---

### 🔄 Wann Agent, wann Assistent?

| Situation | Besser: Assistent | Besser: Agent |
|---|---|---|
| Ich tippe gerade Code | ✅ | – |
| Ich will eine Funktion verstehen | ✅ | ✅ |
| Ich will viele Dateien umstrukturieren | – | ✅ |
| Ich will einen Fehler in Zeile 5 fixen | ✅ | – |
| Ich will das gesamte Projekt refaktorieren | – | ✅ |
| Ich will `cargo test` ausführen und Fehler verstehen | – | ✅ |
| Ich schreibe meinen ersten Code zu einem Konzept | ✅ | – |

---

## 🛠️ Praxis-Aufgaben

### Aufgabe A: Agent erkunden

Öffne die **Antigravity IDE** und navigiere in den Sidebar-Chat.  
Stelle eine einfache Aufgabe:

```
Zeige mir die Struktur meines Projekts und erkläre mir,
welche Dateien wozu dienen.
```

Beobachte: Was „sieht" der Agent? Welche Dateien listet er auf?

---

### Aufgabe B: Planungsmodus testen

Stelle dem Agenten eine Aufgabe, die **mehrere Dateien betrifft**, und bitte ihn explizit:

```
Bevor du etwas änderst: Erstelle erst einen Plan,
was du tun willst. Ich möchte jeden Schritt verstehen.
```

Lies den Plan sorgfältig. Stimme zu oder korrigiere.

---

### Aufgabe C: Diff lesen üben

Lass den Agenten eine kleine Änderung vornehmen – zum Beispiel einen Kommentar zu einer Funktion hinzufügen.  
Öffne den Diff und lese, was genau geändert wurde.  
Frage dann: „Warum hast du die Änderung genau so gemacht?"

---

## 🚀 50 Rust-Projektvorschläge für IDE KI-Agenten

Diese Projekte nutzen die **Stärken eines Agenten**: Planung, Projektstruktur, Multi-File, Terminal.  
Lass den Agenten nicht sofort coden – lass ihn **erst erklären**, dann handeln.

> 🦀 **Lernregel:** Der Agent baut, aber du verstehst.  
> Frage nach jedem Schritt: „Was hast du gemacht und warum?"

---

### 🟢 Einstiegsprojekte (1–10)

1. **Projekt-Setup durch den Agenten** – Lass den Agenten ein neues Rust-Projekt mit `cargo new` erstellen, die Struktur erklären und eine erste `hello_world`-Funktion anlegen.

2. **Kommentierter Starter-Code** – Der Agent schreibt das Grundgerüst eines CLI-Programms und kommentiert **jede Zeile** für Anfänger.

3. **Fehleranalyse-Session** – Schreibe einen Rust-Fehler absichtlich. Der Agent führt `cargo build` aus, analysiert die Fehlermeldung und erklärt (ohne zu reparieren!).

4. **Rustfmt automatisch** – Der Agent führt `cargo fmt` aus und erklärt jeden Formatierungsschritt.

5. **Clippy-Analyse** – Der Agent führt `cargo clippy` aus und übersetzt jede Warnung ins Deutsche.

6. **Modularisierung Schritt 1** – Eine einzelne `main.rs` aufteilen: Der Agent erstellt `src/rechner.rs` und verschiebt eine Funktion dorthin.

7. **Cargo.toml erklärt** – Der Agent analysiert deine `Cargo.toml` und erklärt jeden Eintrag auf Anfängerniveau.

8. **Erste Tests schreiben** – Der Agent erklärt die Test-Syntax in Rust und schreibt Testgerüste (ohne Assertions – die schreibst du).

9. **Variablen und Typen** – Der Agent zeigt durch eine kleine Demo-Datei, wie Rust Typen ableitet (`let x = 5` vs. `let x: i32 = 5`).

10. **Ownership visualisieren** – Der Agent schreibt Beispielcode und erklärt mit Pfeilen (ASCII-Art in Kommentaren), wie Ownership übertragen wird.

---

### 🟡 Mittlere Projekte (11–25)

11. **Vollständige Taschenrechner-App** – Der Agent plant die Dateistruktur (`main.rs`, `operations.rs`, `tests.rs`) und erklärt, bevor er erstellt.

12. **Struct-basierter Studentenverwaltung** – Der Agent legt ein Struct an, erklärt Felder und implementiert grundlegende Methoden.

13. **Trait implementieren** – Der Agent implementiert das `Display`-Trait für ein eigenes Struct und erklärt die Syntax.

14. **Enums mit Daten** – Ein Enum für verschiedene Zahlungsarten – der Agent baut die Varianten und erklärt Pattern Matching.

15. **Fehlerbehandlung mit Result** – Der Agent nimmt eine unsichere Funktion und wandelt `unwrap()` in echte Fehlerbehandlung um.

16. **Iteratoren verstehen** – Der Agent schreibt Beispiele mit `.map()`, `.filter()`, `.collect()` und erklärt jeden Schritt.

17. **Lifetime-Einführung** – Der Agent erstellt einen minimalen Code mit Lifetimes und erklärt, warum der Compiler das fordert.

18. **HashMap-Anwendung** – Kontaktbuch mit `HashMap<String, String>` – der Agent plant Methoden für hinzufügen, suchen, löschen.

19. **Datei schreiben/lesen** – Der Agent erklärt `std::fs` und baut eine einfache Lese/Schreib-Demo.

20. **Closures** – Der Agent demonstriert Closures durch drei verschiedene Beispiele und vergleicht sie mit normalen Funktionen.

21. **Command-Line-Argumente** – Der Agent nutzt `std::env::args()` und baut ein Programm, das auf Argumente reagiert.

22. **String-Verarbeitung** – Der Agent zeigt alle wichtigen String-Methoden (`split`, `trim`, `contains`) in einem kommentierten Demo-Programm.

23. **Mehrere Tests** – Der Agent schreibt Unit-Tests für alle Funktionen des Taschenrechners aus Projekt 11.

24. **Refactoring-Session** – Der Agent nimmt deinen selbst geschriebenen Code und macht ihn „idiomatischer" – mit Erklärung jeder Änderung.

25. **Dokumentation mit `///`** – Der Agent ergänzt alle Funktionen mit Rust-Doc-Kommentaren und erklärt das Format.

---

### 🔴 Fortgeschrittene Projekte (26–40)

26. **Bibliothek (lib.rs)** – Der Agent trennt Logik von `main.rs` in eine `lib.rs` und erklärt `pub` und Sichtbarkeit.

27. **Fehler-Typen definieren** – Ein eigener `enum Error` – der Agent baut ihn und erklärt die Konventionen.

28. **Generics einführen** – Der Agent schreibt eine generische Funktion und erklärt die Syntax `<T>` Schritt für Schritt.

29. **Trait-Objekte** – Der Agent demonstriert `dyn Trait` und erklärt, wann statisches vs. dynamisches Dispatch sinnvoll ist.

30. **Integration-Tests** – Der Agent legt einen `tests/`-Ordner an und erklärt den Unterschied zu Unit-Tests.

31. **Serde für JSON** – Der Agent fügt `serde` zu `Cargo.toml` hinzu, erklärt die Dependency und serialisiert ein Struct.

32. **Clap für CLI** – Der Agent integriert `clap` für professionelle Kommandozeilen-Argumente.

33. **Asynchrone Grundlagen** – Der Agent erklärt `async/await` mit einem minimalen Beispiel und `tokio` als Runtime.

34. **Channels zwischen Threads** – Der Agent baut ein Beispiel mit `std::sync::mpsc` und erklärt das Konzept.

35. **Arc und Mutex** – Shared State zwischen Threads – der Agent erklärt, warum `Rc` nicht reicht.

36. **Builder-Pattern** – Der Agent implementiert das Builder-Pattern für ein komplexes Struct.

37. **State-Machine** – Eine einfache Zustandsmaschine mit Enums – der Agent plant die Zustände und Übergänge.

38. **Prozesse spawnen** – Der Agent nutzt `std::process::Command` und startet externe Programme.

39. **Reguläre Ausdrücke mit `regex`** – Der Agent integriert die `regex`-Crate und erklärt die Pattern-Syntax.

40. **Benchmarks mit `criterion`** – Der Agent richtet Benchmarks ein und erklärt, wie man Rust-Performance misst.

---

### ⚡ Herausforderungsprojekte (41–50)

41. **Vollständige CLI-App mit Tests und Docs** – Ein echtes Projekt: Struktur planen, Logik schreiben, Tests, Dokumentation, Clippy – alles mit Agent als Planungshelfer.

42. **Eigene Datenstruktur** – Eine einfache verkettete Liste in Rust – der Agent erklärt die Besonderheiten mit Ownership.

43. **Makro schreiben** – Der Agent zeigt `macro_rules!` und erstellt ein einfaches Utility-Makro.

44. **Plugin-System** – Dynamisch ladbare Funktionen über Traits – der Agent plant die Architektur.

45. **Mini-Interpreter** – Ein einfacher Interpreter für eine selbst definierte Sprache mit Ausdrücken und Variablen.

46. **Datenbankanbindung** – Der Agent integriert `rusqlite` (SQLite), erklärt Queries und führt Migrationen durch.

47. **HTTP-Client** – Mit `reqwest` eine öffentliche API abfragen und die Antwort parsen.

48. **Websocket-Verbindung** – Ein einfacher Websocket-Client mit `tokio-tungstenite`.

49. **Eigene Derive-Makro** – Der Agent erklärt Proc-Makros und baut ein einfaches `#[derive(MyDebug)]`.

50. **Projekt-Portfolio** – Der Agent hilft, alle bisher gebauten Projekte in eine Bibliothek (Workspace) zu strukturieren und zu dokumentieren.

---

## 💡 Zusammenfassung

| Konzept | Bedeutung |
|---|---|
| IDE KI-Agent | Handelt selbstständig – liest, schreibt, führt aus |
| Planungsmodus | Agent erklärt erst, was er tun will |
| Diff-Ansicht | Alle Änderungen sichtbar vor der Übernahme |
| Multi-File | Mehrere Dateien gleichzeitig bearbeiten |
| Terminal-Integration | `cargo build/test/clippy` automatisch ausführen |
| Assistent vs. Agent | Tippen → Assistent, Projektarbeit → Agent |

> 🦀 **Merke:** Ein IDE-Agent ist mächtiger als ein Assistent – aber Macht braucht Verantwortung.  
> Verstehe jede Änderung, die der Agent macht. Der Lerneffekt liegt im Diff!

---

## 📚 Weiterführende Links

- [Cursor IDE](https://cursor.sh/) – KI-first Editor auf VS Code-Basis
- [Windsurf](https://codeium.com/windsurf) – Cascade-Agent-System
- [Antigravity IDE Dokumentation](https://antigravity.google/docs) – Antigravity IDE
- [Rust-Buch](https://doc.rust-lang.org/book/) – Die offizielle Rust-Referenz
- [Cargo Guide](https://doc.rust-lang.org/cargo/) – Projektverwaltung mit Cargo
