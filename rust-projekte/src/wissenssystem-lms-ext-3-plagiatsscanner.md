# 🔎 LMS-Erweiterung 3: Code- & Text-Plagiatsscanner (AST-Vergleich & Levenshtein)

Willkommen zum dritten Erweiterungsmodul unseres Lernmanagementsystems! In einem modernen LMS reichen einfache Multiple-Choice-Quizzes oft nicht aus – besonders in Programmierkursen reichen Lernende komplexe Quelltexte und Freitext-Aufgaben ein. 

Doch was passiert, wenn zwei Einreichungen verdächtig ähnlich sehen? Wie unterscheidet ein digitales Prüfungsamt zwischen einer zufälligen Übereinstimmung und einem echten Plagiat? In diesem Kapitel bauen wir einen intelligenten **Code- und Text-Plagiatsscanner** in Rust.

---

## 🚀 Einleitung & Vision: Automatische Erkennung im LMS

In großen Online-Kursen mit hunderten Teilnehmenden ist die manuelle Durchsicht aller Abgaben zeitlich unmöglich. Ein automatischer Plagiatsscanner unterstützt Dozenten und Tutorinnen, indem er alle Einreichungen analysiert und auffällige Paare flaggt.

Dabei stehen wir vor zwei wesentlichen Herausforderungen:
1. **Fließtext-Abgaben (Essays, Ausarbeitungen):** Hier müssen Tippfehler, minimale Umformulierungen oder vertauschte Sätze erkannt werden.
2. **Quellcode-Abgaben (Rust, Python, C++):** Das bloße Vergleichen von Texten versagt hier völlig. Wenn jemand Variablennamen umbenennt (`let alter = 25` zu `let age = 25`) oder Leerzeilen einfügt, ist der Quelltext für einen normalen Textvergleich anders – die zugrunde liegende Logik ist jedoch zu 100 % kopiert!

Unsere Vision für das LMS ist ein mehrstufiges Analysesystem, das Quellcode vor der Analyse in seine abstrakte Struktur zerlegt (**AST-Normalisierung**) und Texte mittels kinetischer Distanzmessung (**Levenshtein-Algorithmus**) vergleicht.

---

## 🧠 Die Bildmetapher: Der Fingerabdruck-Scripter der Universität

Stell dir unseren Plagiatsscanner wie den **Fingerabdruck-Scripter des akademischen Prüfungsamts** vor:

```text
┌───────────────────────────────────────────────────────────────────────────────┐
│                    DER FINGERABDRUCK-SCRIPTER DES PRÜFUNGSAMTS                │
│                                                                               │
│  [ Einreichung A ]                                   [ Einreichung B ]        │
│  `let mut summe = 0;`                                `let mut total = 0;`     │
│         │                                                   │                 │
│         ▼                                                   ▼                 │
│  1. 🧼 Stempel-Cleaner (Tokenisierer & Anonymisierer)                         │
│     Reinigt Kommentare, Formatsymbole & ersetzt Bezeichner durch VAR_0, VAR_1 │
│     -> `let mut VAR_0 = 0;`                                                  │
│         │                                                   │                 │
│         ▼                                                   ▼                 │
│  2. 🦴 Röntgen-Blick (AST-Struktur-Analyse)                                   │
│     Sucht nach dem Skelett (Schleifen, Variablenzuweisungen, Verzweigungen)  │
│         │                                                   │                 │
│         ▼                                                   ▼                 │
│  3. 📐 Der Messschieber (Levenshtein- & Jaccard-Distanz)                      │
│     Misst die genaue minimale Anzahl an Umwandlungsschritten zwischen A & B   │
│         │                                                                     │
│         └─────────────────────────┬───────────────────────────────────────────┘
│                                   ▼
│                    🚨 Plagiats-Score: 98% Ähnlichkeit!
└───────────────────────────────────────────────────────────────────────────────┘
```

1. **Der Stempel-Cleaner:** Entfernt jegliches "Make-up" wie Einrückungen, Kommentare und individuelle Namen.
2. **Der Röntgen-Blick:** Schaut durch den Code hindurch auf den *Abstract Syntax Tree (AST)* – die reine logische Baumstruktur.
3. **Der Messschieber:** Berechnet mit mathematischer Präzision die Distanz zwischen zwei Abgaben und liefert einen Prozentwert für die Wahrscheinlichkeit eines Plagiats.

---

## 🏗️ Architektur & Erkennungs-Methoden

### 1. Warum reine String-Gleichheit bei Code versagt

Betrachten wir zwei Rust-Funktionen zweier unterschiedlicher Einreichungen:

**Student A:**
```rust
fn berechne_summe(zahlen: &[i32]) -> i32 {
    let mut summe = 0;
    for z in zahlen {
        summe += z;
    }
    summe
}
```

**Student B:**
```rust
fn compute_total(arr: &[i32]) -> i32 {
    // Hier wird aufsummiert
    let mut total = 0;
    for item in arr {
        total += item;
    }
    total
}
```

Ein naiver String-Vergleich (`submission_a == submission_b`) stellt eine **0 % Übereinstimmung** fest, weil Funktionsname, Variablennamen und Kommentare abweichen. In Wahrheit hat Student B lediglich die Namen übersetzt und einen Kommentar hinzugefügt!

---

### 2. AST-Normalisierung (Abstract Syntax Tree)

Um dieses Problem zu lösen, wandeln wir den Code in ein anonymisiertes Format um. Dabei werden Variablen- und Funktionsbezeichner durch fortlaufende Platzhalter (`VAR_0`, `VAR_1`, `FN_0`) ersetzt:

* Original 1: `let mut summe = 0;` $\rightarrow$ Normalisiert: `let mut VAR_0 = 0;`
* Original 2: `let mut total = 0;` $\rightarrow$ Normalisiert: `let mut VAR_0 = 0;`

Nach der Normalisierung stimmen beide Anweisungen exakt überein! 

---

### 3. Levenshtein-Distanz & Jaccard-Ähnlichkeit

Für Texte und leicht modifizierte Code-Sequenzen nutzen wir zwei bewährte mathematische Werkzeuge:

#### A. Levenshtein-Distanz (Edit-Distanz)
Die Levenshtein-Distanz gibt an, wie viele **Einfüge-**, **Lösch-** oder **Ersetzungsschritte** von einzelnen Zeichen notwendig sind, um einen String $S_1$ in einen String $S_2$ zu verwandeln.

* Beispiel: `"Katze"` $\rightarrow$ `"Tatze"` = Distanz `1` (Ersetzen von 'K' durch 'T').
* Beispiel: `"Haus"` $\rightarrow$ `"Maus"` = Distanz `1`.

Daraus berechnen wir die Ähnlichkeit $Sim(S_1, S_2)$ normiert zwischen $0.0$ (völlig unterschiedlich) und $1.0$ (identisch):

$$Sim(S_1, S_2) = 1.0 - \frac{\text{Levenshtein}(S_1, S_2)}{\max(|S_1|, |S_2|)}$$

#### B. Jaccard-Ähnlichkeit (Token-Mengen)
Die Jaccard-Ähnlichkeit vergleicht die Menge der enthaltenen Wörter oder Code-Token ($n$-Grams) ohne Rücksicht auf die genaue Reihenfolge:

$$J(A, B) = \frac{|A \cap B|}{|A \cup B|}$$

---

## ⚙️ Code-Gerüst mit `todo!()`

Jetzt bist du an der Reihe! Implementiere den Kern unseres Plagiatsscanners. Nachfolgend findest du das Vorlage-Gerüst mit Typen und Funktions-Signaturen.

```rust
use std::collections::HashSet;

/// Bericht über eine Plagiatsprüfung zwischen zwei Einreichungen
#[derive(Debug, Clone, PartialEq)]
pub struct PlagiarismReport {
    pub submission_id_a: String,
    pub submission_id_b: String,
    pub similarity_score: f32, // Wert zwischen 0.0 (keine Ähnlichkeit) und 1.0 (Plagiat)
    pub is_suspicious: bool,    // Schwelle z.B. bei >= 0.85 (85%)
}

/// Normalisiert Quellcode, indem Kommentare entfernt, Whitespaces reduziert
/// und Variablennamen anonymisiert werden.
///
/// # Beispiele für das Ziel-Verhalten:
/// - `let a = 5;` -> `let VAR_0 = 5;`
/// - `let x = 10;` -> `let VAR_0 = 10;`
pub fn normalize_code_ast(code: &str) -> String {
    // DENKANSTOSS & LEITFRAGEN:
    // 1. Wie kannst du Zeilenkommentare (beginnend mit //) herausfiltern?
    // 2. Wie zerlegst du den String in Wörter/Tokens?
    // 3. Wie merkst du dir bereits gesehene Variablennamen (z. B. mit einer HashMap<String, String>),
    //    um sie einheitlich durch "VAR_0", "VAR_1" etc. zu ersetzen?
    todo!("Implementiere die Code-Normalisierung für den AST-Vergleich")
}

/// Berechnet die Levenshtein-Distanz (Edit-Distanz) zwischen zwei Zeichenketten.
///
/// Tipp: Verwende Dynamische Programmierung mit einer 2D-Matrix (oder zwei Zeilen).
/// Matrix-Größe: (len1 + 1) x (len2 + 1)
pub fn levenshtein_distance(s1: &str, s2: &str) -> usize {
    // DENKANSTOSS:
    // Ist einer der Strings leer, ist die Distanz gleich der Länge des anderen Strings.
    // Ansonsten gilt für char s1[i] und char s2[j]:
    // - Wenn s1[i] == s2[j]: Kosten = 0
    // - Wenn s1[i] != s2[j]: Kosten = 1
    // d[i][j] = min( Löschen: d[i-1][j] + 1, Einfügen: d[i][j-1] + 1, Ersetzen: d[i-1][j-1] + Kosten )
    todo!("Implementiere die Levenshtein-Distanz mittels Dynamischer Programmierung")
}

/// Berechnet den Gesamt-Plagiats-Score (0.0 bis 1.0) zweier Code-Einreichungen.
pub fn calculate_plagiarism_score(submission_a: &str, submission_b: &str) -> f32 {
    // LEITFADEN:
    // 1. Normalisiere beide Abgaben mit `normalize_code_ast`.
    // 2. Berechne die Levenshtein-Distanz der normalisierten Strings.
    // 3. Ermittle die maximale Länge beider normalisierter Strings.
    // 4. Berechne den Ähnlichkeitsscore: 1.0 - (distanz / max_len).
    todo!("Kombiniere Normalisierung und Distanzberechnung zu einem Gesamt-Score")
}
```

---

## 🧪 Übungsaufgaben

Testen wir dein Wissen! Setze die folgenden drei Aufgaben um, um den Plagiatsscanner Schritt für Schritt zum Leben zu erwecken.

### 🏋️ Aufgabe 1: Leicht (Levenshtein Matrix)
* **Ziel:** Implementiere die Funktion `levenshtein_distance` für kurze Zeichenketten.
* **Anforderungen:**
  - Wandle die Strings mit `.chars().collect::<Vec<char>>()` um, um UTF-8-Zeichen korrekt zu verarbeiten.
  - Teste deine Funktion mit folgenden Paaren:
    - `"Rust"` vs `"Rust"` $\rightarrow$ `0`
    - `"Rust"` vs `"Rest"` $\rightarrow$ `1`
    - `"Haus"` vs `"Maus"` $\rightarrow$ `1`
    - `"Kaffee"` vs `""` $\rightarrow$ `6`

---

### 🏋️‍♀️ Aufgabe 2: Mittel (Variablennamen-Anonymisierer)
* **Ziel:** Baue einen Token-Scanner, der Bezeichner nach `let` oder `let mut` erkennt und anonymisiert.
* **Denkanstoß:**
  - Durchlaufe die Wörter der Eingabe.
  - Wenn das Schlüsselwort `let` erkannt wird, ist das nächste Wort (vor dem `=` oder `:`) ein Variablenname.
  - Speichere diesen Namen in einer `HashMap<String, String>` und ordne ihm z. B. `"VAR_0"` zu.
  - Ersetze alle zukünftigen Vorkommen dieses Namens durch den zugewiesenen Platzhalter.

---

### 🏋️‍♂️ Aufgabe 3: Schwer (Plagiats-Matrix für alle Kurs-Einreichungen)
* **Ziel:** Baue eine Funktion `scan_all_submissions(submissions: &[Submission]) -> Vec<PlagiarismReport>`.
* **Anforderungen:**
  - Eine `Submission` besitzt eine `id: String`, `student_name: String` und `code: String`.
  - Vergleiche alle Paare von Einreichungen paarweise ($O(N^2)$ Paarvergleich).
  - Vermeide doppelte Vergleiche (Vergleiche A mit B, aber nicht B mit A oder A mit A).
  - Gib nur Berichte zurück, bei denen der `similarity_score >= 0.85` (85 % Ähnlichkeit) liegt.

---

## 🎯 Zusammenfassung

Herzlichen Glückwunsch! Du hast verstanden, wie moderne Lernplattformen Plagiate in Quellcode und Texten aufdecken:

- **String-Vergleich reicht nicht:** Durch Umbenennen von Variablen und Formatieren lässt sich naiver Textvergleich leicht täuschen.
- **AST & Normalisierung:** Durch die Reduktion auf die Wesentlichen Bausteine (`VAR_0`, `VAR_1`) wird die innere Struktur von Quellcode sichtbar.
- **Edit-Distanzen:** Die Levenshtein-Distanz misst präzise den Aufwand, ein Dokument in ein anderes zu überführen.

Mit diesem Werkzeug ist dein LMS bestens gerüstet für faire Prüfungen und automatisierte Auswertungen!
