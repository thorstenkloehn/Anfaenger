# 🛹 Mitmach-Workshop: Coding mit KI – Phase 1 bildhaft verstehen

Willkommen beim Mitmach-Workshop zur Phase 1! 🚀✨

In diesem Workshop verlassen wir die trockene Theorie und tauchen bildhaft in die Welt des Codings mit Künstlicher Intelligenz (KI) ein. Wir entwickeln ein tiefes Verständnis dafür, wie KI-Modelle arbeiten, wie sich unsere Rolle als Entwickler verändert und wie wir KI gezielt als didaktischen Lernbeschleuniger nutzen können – ohne dabei das eigene Denken zu verlernen.

---

## 🧠 Theorie: Die KI-Konzepte bildhaft erklärt

### 1. Evolution & KI-Grundlagen

#### 🦖 Vom Lochkarten-Bit zum KI-Prompt (Die Abstraktionsstufen)
Stell dir vor, du möchtest einem Roboter befehlen, Kaffee zu kochen:
1. **Epoche 1 (Lochkarten & Maschinencode):** Du musst die elektronischen Relais des Roboters einzeln mit Kabeln verbinden. Du denkst in Stromflüssen (0 und 1). Ein winziger Fehler, und die Küche steht unter Wasser.
2. **Epoche 2 (Assembler):** Du gibst kurze Befehle wie `LOAD Wasser`, `MOVE Kanne`. Es ist einfacher, aber du musst immer noch jeden mechanischen Schritt des Roboters einzeln steuern.
3. **Epoche 3 (Compiler & Hochsprachen):** Du schreibst strukturierte Rezepte: `if tasse.ist_leer() { kaffee.eingiessen(); }`. Ein Compiler übersetzt das Rezept in die Roboter-Bewegungen.
4. **Epoche 4 (IDEs & Autovervollständigung):** Während du schreibst, schlägt das System dir passende Worte vor (z. B. `.eingiessen()`). Du musst die Namen der Befehle nicht mehr auswendig lernen, tippst aber jede Zeile selbst.
5. **Epoche 5 (Generative KI):** Du sagst dem Roboter: *"Koche mir einen starken, heißen Espresso und bring ihn mir an den Schreibtisch."* Die KI generiert das gesamte Rezept und steuert den Roboter. Du programmierst auf der Ebene von Konzepten und Absichten.

---

#### 🔮 Codevorschläge vs. Klassische Autovervollständigung
Es gibt einen fundamentalen Unterschied zwischen der klassischen Autovervollständigung (wie IntelliSense) und modernen KI-Codevorschlägen (wie GitHub Copilot):

*   **Die klassische Autovervollständigung (Der Duden-Bibliothekar):**
    Sie ist deterministisch. Wenn du ein Buch schreiben willst und das Wort "Bibli" eintippst, schlägt sie dir "Bibliothek" oder "Bibliothekar" vor. Sie schlägt nur Wörter vor, die im offiziellen Wörterbuch der Programmiersprache (Compiler/AST) existieren und an dieser Stelle grammatikalisch 100% korrekt sind. Sie rät nicht, sie weiß.
*   **KI-Codevorschläge (Der phantasievolle Papagei):**
    Sie ist probabilistisch (wahrscheinlichkeitsbasiert). Wenn du schreibst: *"Es war einmal ein treuer..."*, berechnet die KI aus all den Millionen Geschichten, die sie je gelesen hat, dass danach am wahrscheinlichsten das Wort *"Hund"* (70% Wahrscheinlichkeit) oder *"Ritter"* (25% Wahrscheinlichkeit) folgt. Sie schlägt dir ganze Absätze vor. Sie weiß jedoch nicht, ob deine Geschichte wahr ist – sie rechnet nur aus, was statistisch am besten klingt.

---

#### 🧠 Token-Management & Das Kontextfenster (Der Büro-Tisch des Praktikanten)
Um mit einem Large Language Model (LLM) zu arbeiten, musst du verstehen, wie es sich Dinge merkt:

*   **Tokens (Die Papierschnipsel):**
    KIs lesen keine ganzen Wörter, sondern zerlegen Text in kleine Teile (Tokens). Ein kurzes Wort ist oft ein Token. Ein langes, komplexes deutsches Wort mit Umlauten (*„Prüfziffernvalidierungsfunktion“*) oder Code mit vielen Sonderzeichen (`#[derive(Debug)]`) wird in viele kleine Tokens zerlegt.
*   **Das Kontextfenster (Die Tischplatte):**
    Stell dir vor, du setzt einen Praktikanten an einen Schreibtisch. Der Schreibtisch symbolisiert das **Kontextfenster**. Auf diesem Tisch liegen:
    1. Die Grundregeln, wie er sich verhalten soll (System-Prompt).
    2. Der bisherige Chatverlauf.
    3. Der Code, der in deiner IDE in offenen Tabs geöffnet ist.
    4. Deine aktuelle Frage.

    Sobald die Tischplatte voll ist (das Token-Limit erreicht ist), wendet der Praktikant das **FIFO-Prinzip (First In, First Out)** an: Er nimmt die ältesten Zettel auf der linken Seite des Tisches und wirft sie ungelesen in den Schredder, um Platz für neue Zettel zu machen.
    *Die Folge:* Die KI vergisst plötzlich, welche Variablen du anfangs definiert hast, oder ignoriert vereinbarte Regeln (z. B. *"Schreibe mir keinen fertigen Code"*).

---

#### 🤖 Die probabilistische Engine & Das Abstraktionsproblem (Die Illusion des Verstandes)
Weil die KI grammatikalisch perfekten Code generieren kann, glauben wir instinktiv, sie habe die Logik verstanden. Das ist das **Abstraktionsproblem**.
Die KI führt den Code nicht in ihrem Kopf aus. Sie ist eine probabilistische Engine, die Next-Token-Prediction betreibt.

> [!WARNING]
> **Die Halluzination:** Wenn du die KI nach einer Funktion fragt, die ein komplexes mathematisches Problem löst, kann es sein, dass sie eine Bibliothek (ein Crate) erfindet, die perfekt klingt (`extern crate super_math_helper;`), in der realen Rust-Welt aber gar nicht existiert. Sie plappert das nach, was am wahrscheinlichsten klingt.

---

#### 🧑‍💼 Das mentale Modell: Der unkonzentrierte Praktikant
Betrachte die KI niemals als allwissenden Gott, sondern als einen **blitzschnellen, hochmotivierten, aber extrem unkonzentrierten Praktikanten**:
*   Er hat das gesamte theoretische Wissen der Welt im Kopf.
*   Er arbeitet in Lichtgeschwindigkeit.
*   **Aber:** Er neigt zu Flüchtigkeitsfehlern, übersieht Sonderfälle, liest deine Anweisung oft nur halb durch und versucht, dich mit selbstbewusst vorgetragenen Halbwahrheiten zu beeindrucken, um gut dazustehen.

*Wie führt man diesen Praktikanten?*
1.  Gib ihm klare, strukturierte Aufgaben.
2.  Lass ihn Zwischenschritte erklären (Chain-of-Thought).
3.  Kontrolliere seine Arbeit penibel (Code-Review).

---

### 2. Der Paradigmenwechsel

#### ⚡ Die FAAFO-Philosophie
Durch KI verändert sich die Art, wie wir lernen und arbeiten. Die FAAFO-Philosophie steht für:
*   **F**ast (Schnell): Fehler werden sofort korrigiert, Prototypen laufen in Sekunden.
*   **A**mbitious (Ambitioniert): Trau dich an große Projekte heran, die Syntax-Angst fällt weg.
*   **A**utonomous (Autonom): Du brauchst keine Hilfe von Dritten; die KI erklärt dir jeden Compilerfehler.
*   **F**un (Spaß): Kein stundenlanges Frustrieren über ein vergessenes Semikolon. Du siehst sofort Ergebnisse.
*   **O**ptionality (Optionalität): Probiere drei verschiedene Lösungswege parallel aus und lerne die Unterschiede kennen.

---

#### 👨‍🍳 Vom Linienkoch zum Küchenchef (Das 70%-Problem)
*   **Der Linienkoch (Der manuelle Coder):**
    Steht stundenlang am Brett und schneidet Zwiebeln. Er schreibt Standardcode: Schleifen, Getter/Setter, einfache Datenstrukturen.
*   **Der Küchenchef (Der System-Orchestrator):**
    Entwirft das Menü (Architektur), wählt die Zutaten (Bibliotheken/Algorithmen) und schmeckt das Gericht ab (Code-Review, Tests, Sicherheit).

> [!IMPORTANT]
> **Das 70%-Problem (nach Addy Osmani):**
> Die ersten 70% eines Codes (Standard-Boilerplate) schreibt dir die KI in Millisekunden. Aber die restlichen 30% entscheiden über Erfolg oder Misserfolg: Edge Cases (Grenzfälle), Sicherheitslücken, Performance und Fehlerbehandlung. Diese 30% erfordern den Küchenchef – also dich! Du musst die Konzepte verstehen, um diese 30% lenken und prüfen zu können.

---

### 3. Prompt Engineering & Tool-Setup

#### 💬 Die drei Prompting-Stufen
1.  **Zero-Shot (Direkter Befehl):**
    *"Schreibe eine Funktion für einen IBAN-Check."* (Keine Beispiele, die KI improvisiert).
2.  **Few-Shot (Lernen durch Beispiele):**
    *"Ich möchte Logik in Text übersetzen. Beispiel: `x > 5` -> 'x ist größer als 5'. Übersetze jetzt: `y < 10`."* (Die KI lernt das genaue Format aus deinen Beispielen).
3.  **Chain-of-Thought (Schritt-für-Schritt-Denken):**
    *"Erkläre mir erst logisch in Schritten, wie man eine Primzahl prüft. Schreibe die Schritte als Kommentar auf. Generiere erst danach das leere Code-Gerüst."* (Zwingt die KI, strukturiert vorzugehen).

---

#### 📐 Die Anatomie eines perfekten Prompts
Ein professioneller Prompt ist wie ein detailliertes Kochrezept aufgebaut:
1.  **Rolle/Kontext:** *"Du bist ein didaktischer Rust-Mentor. Ich bin ein Einsteiger."*
2.  **Anweisung:** *"Erstelle ein Code-Gerüst für eine IBAN-Prüfung."*
3.  **Eingabedaten:** *"Verwende als Basis diese Struktur: `struct Iban(String);`."*
4.  **Ausgabeformat:** *"Erstelle KEINE fertige Codelösung, sondern nutze das `todo!()`-Makro und schreibe didaktische Hinweise."*

---

#### 🛠️ Tool-Setup im Überblick
*   **GitHub Copilot:** Der klassische Assistent in deiner IDE (VS Code). Schlägt direkt beim Tippen Zeilen vor.
*   **Cody & Warp:** Cody durchsucht deine gesamte Codebase im Projektordner. Warp bringt die KI direkt ins Terminal.
*   **Bolt.new:** Schnelles Prototyping direkt im Webbrowser (für Web-Apps) – Vibe Coding par excellence.

---

## 🛠️ Praxis-Aufgaben: Pair Programming zum Lernen

Jetzt arbeiten wir im Team! Du bist der Küchenchef, die KI ist dein Praktikant.
Wir wollen **keine fertigen Lösungen kopieren**, sondern uns didaktische Gerüste bauen lassen und diese Schritt für Schritt selbst implementieren.

### 🟢 Aufgabe 1: Der aktive Lern-Turbo (Konzept verstehen)
**Ziel:** Nutze die KI, um einen Compiler-Fehler zu verstehen, ohne dir die Lösung geben zu lassen.

1.  Schreibe folgenden fehlerhaften Code in dein Projekt:
    ```rust
    fn main() {
        let name = String::from("Rust-Bibliothek");
        let besitzer_1 = name;
        
        // Versuche, den ursprünglichen String noch einmal zu verwenden:
        println!("Das Buch heißt: {}", name); 
    }
    ```
2.  Führe den Code aus und betrachte die Fehlermeldung des Compilers.
3.  **Prompt an die KI:**
    > *"Ich habe einen Compilerfehler in Rust erhalten: `use of moved value: name`. Bitte erkläre mir diesen Fehler bildhaft mit der Analogie eines Bibliotheks-Karteizettels. Verrate mir nicht den korrigierten Code, sondern gib mir nur einen Tipp, wie ich den Besitz (Ownership) behalten oder das Buch ausleihen kann."*
4.  Löse den Fehler selbstständig in deinem Editor.

---

### 🟡 Aufgabe 2: IBAN-Validierung (Didaktisches Code-Gerüst)
Wir möchten eine vereinfachte IBAN-Prüfung für deutsche Konten (`DE` + 20 Ziffern = 22 Zeichen) implementieren. 

#### Die mathematischen Schritte:
1.  Leerzeichen entfernen und in Großbuchstaben umwandeln.
2.  Prüfen, ob die Länge genau 22 Zeichen beträgt und mit `DE` startet.
3.  Die ersten 4 Zeichen (`DE` + Prüfziffer) ans Ende verschieben.
4.  Buchstaben in Zahlen umwandeln (`D` -> `13`, `E` -> `14`).
5.  Die Modulo-97-Prüfung durchführen. (Wenn der Rest 1 ist, stimmt die IBAN).

#### Das Code-Gerüst (Ersetze die `todo!()`):

```rust
// ==========================================
// MITSCHREIB-WORKSHOP: IBAN-VALIDATOR
// ==========================================

/// Schritt 1: Bereinigt die IBAN von Leerzeichen und wandelt sie in Großbuchstaben um.
fn bereinige_iban(iban: &str) -> String {
    // TIPP: Nutze .replace(" ", "") und .to_uppercase()
    todo!("Nutze replace und to_uppercase, um die IBAN zu säubern.")
}

/// Schritt 2: Validiert, ob die IBAN mit "DE" startet und genau 22 Zeichen lang ist.
fn hat_deutsches_format(iban: &str) -> bool {
    // TIPP: Nutze .starts_with("DE") und .len() == 22
    todo!("Prüfe den Ländercode und die exakte Länge.")
}

/// Schritt 3: Verschiebt die ersten 4 Zeichen ans Ende.
/// Beispiel: "DE89123456" -> "123456DE89"
fn verschiebe_anfang_nach_ende(iban: &str) -> String {
    // TIPP: Nutze String-Slices: &iban[0..4] für die ersten vier Zeichen,
    // und &iban[4..] für den Rest. Verbinde sie danach.
    todo!("Teile die IBAN in zwei Slices und setze sie neu zusammen.")
}

fn main() {
    let test_iban = "DE89 3704 0044 0532 0130 00";
    
    let bereinigt = bereinige_iban(test_iban);
    println!("1. Bereinigt: {}", bereinigt);
    
    if hat_deutsches_format(&bereinigt) {
        println!("2. Format-Check: Gültiges deutsches Format!");
        let umgestellt = verschiebe_anfang_nach_ende(&bereinigt);
        println!("3. Umgestellt: {}", umgestellt);
    } else {
        println!("2. Format-Check: Ungültiges Format!");
    }
}
```

---

### 🔴 Aufgabe 3: Ein einfaches Text-Quiz (Strukturierter Entwurf)
Wir wollen ein einfaches Text-Quiz in der Konsole bauen.
Da wir uns in Phase 1 befinden, nutzen wir keine komplexen Arrays, sondern arbeiten mit einfachen Strukturen, Bedingungen und dem Einlesen von Benutzereingaben.

#### Das Code-Gerüst (Ersetze die `todo!()`):

```rust
use std::io;

/// Struktur für eine Quizfrage
struct Frage {
    frage_text: String,
    antwort_a: String,
    antwort_b: String,
    korrekte_antwort: char, // 'a' oder 'b'
}

/// Liest die Eingabe des Benutzers (A oder B) ein und bereinigt sie.
fn lies_benutzer_auswahl() -> char {
    let mut eingabe = String::new();
    
    // TIPP: Nutze io::stdin().read_line(&mut eingabe)
    // Entferne Leerzeichen mit .trim()
    // Wandle die Eingabe in Kleinbuchstaben um und hole das erste Zeichen.
    todo!("Lese die Zeile ein, trimme sie und gib das erste Zeichen als Kleinbuchstabe zurück.")
}

/// Präsentiert die Frage und prüft, ob die Antwort korrekt war.
fn frage_stellen(frage: &Frage) -> bool {
    println!("\n{}", frage.frage_text);
    println!("a) {}", frage.antwort_a);
    println!("b) {}", frage.antwort_b);
    println!("Deine Antwort (a/b):");
    
    let antwort = lies_benutzer_auswahl();
    
    // TIPP: Vergleiche die Benutzereingabe mit frage.korrekte_antwort
    todo!("Vergleiche die Eingabe und gib true zurück, wenn sie korrekt war, sonst false.")
}

fn main() {
    let quiz_frage = Frage {
        frage_text: String::from("Welche Engine-Art beschreibt ein LLM (wie ChatGPT/Gemini)?"),
        antwort_a: String::from("Deterministische Engine (Regelbasiert, immer 100% korrekt)"),
        antwort_b: String::from("Probabilistische Engine (Wahrscheinlichkeitsbasiert)"),
        korrekte_antwort: 'b',
    };
    
    println!("--- KI-GRUNDLAGEN QUIZ ---");
    let ergebnis = frage_stellen(&quiz_frage);
    
    if ergebnis {
        println!("🎉 Korrekt! Du hast verstanden, wie LLMs arbeiten!");
    } else {
        println!("❌ Leider falsch. Lies dir noch einmal den Abschnitt über Autovervollständigung durch!");
    }
}
```

---

## 🚀 Projektideen: Nutze deine KI als Mentor
Verwende die gelernten Prompting-Techniken (insbesondere Chain-of-Thought und Ausgabeformatierung), um dir von der KI **didaktische Gerüste** für folgende Mini-Projekte erstellen zu lassen:

1.  **Der Taschenrechner mit Operator-Abfrage:** Ein Konsolen-Rechner, der zwei Zahlen einliest, danach fragt, ob addiert, subtrahiert, multipliziert oder dividiert werden soll, und das Ergebnis ausgibt.
2.  **Das Zahlen-Ratespiel:** Der Computer wählt eine Zufallszahl (Tipp: Frage die KI, wie man eine Zufallszahl generiert, oder nimm eine feste Zahl für den Anfang). Der Benutzer rät so lange, bis er die Zahl trifft. Der Computer gibt nach jedem Versuch Tipps wie *"Zu hoch"* oder *"Zu niedrig"*.

---

## 💡 Zusammenfassung

| Konzept | Bildhafte Analogie | Deine Rolle als Entwickler | Syntax / Praxis |
| :--- | :--- | :--- | :--- |
| **Compiler vs. Generative KI** | Kabel verlegen (Lochkarte) vs. Rezept in natürlicher Sprache beschreiben. | Vom manuellen Schreiber zum System-Orchestrator. | Prompts statt reiner Syntax-Eingabe. |
| **Klassische Vervollständigung** | Der Duden-Bibliothekar (Deterministisch, 100% regelkonform). | Nutzen für präzise API-Aufrufe. | IntelliSense / Sprachserver. |
| **KI-Codevorschlag** | Der phantasievolle Papagei (Probabilistisch, errät den Text). | Kritische Qualitätskontrolle, da Fehler möglich sind. | GitHub Copilot / Tabnine. |
| **Kontextfenster** | Der Schreibtisch des Praktikanten (FIFO-Prinzip bei Überfüllung). | Chatverläufe kurz halten, irrelevante Tabs schließen. | API-Token-Limits beachten. |
| **Vibe Engineering** | Anleitung eines schnellen, unkonzentrierten Praktikanten. | Klare Schnittstellen definieren, kontinuierlich Code-Reviews machen. | Modulare Funktionen mit `todo!()`. |
| **Das 70%-Problem** | Schnell geschnittenes Gemüse (KI) vs. das finale Abschmecken (Mensch). | Den kritischen Fokus auf Edge Cases, Security & Performance legen. | Tests schreiben, Code analysieren. |

---

## 📚 Links
*   [Die offizielle Rust-Dokumentation (The Book)](https://doc.rust-lang.org/book/)
*   [Rust-Standardbibliothek API-Referenz (std::io)](https://doc.rust-lang.org/std/io/index.html)
*   [Einführung in Prompt Engineering (DeepLearning.AI)](https://www.deeplearning.ai/short-courses/prompt-engineering-for-developers/)
