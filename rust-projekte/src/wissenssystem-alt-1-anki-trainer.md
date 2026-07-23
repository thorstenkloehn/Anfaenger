# 📇 Alternativ-System 1: Der Anki / Spaced-Repetition Karteikarten-Trainer

Willkommen zu einer spannenden Alternative für dein persönliches Wissenssystem! In diesem Kapitel widmen wir uns einem mächtigen Werkzeug gegen das Vergessen: einem eigenen **Spaced-Repetition Karteikarten-Trainer** auf Basis des berühmten SM-2-Algorithmus (bekannt aus Anki).

---

## 🚀 Einleitung & Vision: Die Vergessenskurve austricksen

Kennst du das Gefühl? Du liest ein fantastisches Buch über Rust, verstehst ein schwieriges Konzept wie *Lifetimes* oder *Interior Mutability* auf Anhieb – doch drei Wochen später stehst du wieder vor einem leeren Bildschirm und musst es erneut nachschlagen.

Der deutsche Psychologe **Hermann Ebbinghaus** hat dieses Phänomen bereits im 19. Jahrhundert erforscht und die sogenannte **Vergessenskurve** beschrieben: Unser Gehirn baut neu gelerntes Wissen exponentiell schnell ab, wenn wir es nicht im richtigen Moment wiederholen.

Hier kommt **Spaced Repetition** (abgestufte Wiederholung) ins Spiel! Anstatt eine Karteikarte täglich stur zu pauken, fragen wir sie genau dann ab, wenn das Gehirn kurz davor ist, sie zu vergessen. Mit jeder erfolgreichen Wiederholung wird das Intervall bis zur nächsten Abfrage länger: von 1 Tag auf 6 Tage, dann auf 2 Wochen, 1 Monat, 3 Monate...

### Warum bauen wir das in Rust?
* **Strikte Datentypen & Datumslogik:** Mit Rust-Crates wie `chrono` (für Daten) und `uuid` (für eindeutige Karten-IDs) lernst du, wie man zeitkritische und strukturierte Daten sicher verwaltet.
* **Rustikale Performance:** Selbst Sammlungen mit zehntausenden Karteikarten lassen sich blitzschnell im Arbeitsspeicher auswerten und filtern.

---

## 🧠 Die Bildmetapher: Der gedächtnisoptimierte Lernkarteikasten

Stell dir einen klassischen Karteikasten auf deinem Schreibtisch vor – allerdings einen **magischen Karteikasten 2.0**:

1. **Die Fächer (Intervalle):** Der Kasten hat nicht nur 5 feste Fächer, sondern dynamische Zeitfächer. Auf jedem Fach steht ein Kalenderdatum (z. B. *"Morgen"*, *"In 6 Tagen"*, *"In 3 Wochen"*).
2. **Der Schwierigkeits-Regler (`ease_factor`):** Jede Karteikarte trägt einen kleinen Schieberegler an der Seite. Er steht standardmäßig auf `2.5`. Fällt dir eine Frage kinderleicht, schiebst du den Regler etwas höher – die Abstände für diese Karte werden in Zukunft riesig! Fällt dir die Antwort schwer, stellst du den Regler niedriger – die Karte wird dich öfter besuchen.
3. **Der Lern-Coach (`StudySession`):** Jeden Morgen öffnet dein Coach den Kasten, greift genau die Karten heraus, deren Abfragedatum heute erreicht oder überschritten ist, und legt sie dir vor.

---

## 🏗️ Architektur & Datenstrukturen

Lass uns diesen magischen Karteikasten in klare Rust-Datenstrukturen gießen.

### 1. Die Karteikarte (`Flashcard`)
Jede Karteikarte benötigt Metadaten, um den Abfragezustand zu speichern:

```rust
use chrono::NaiveDate;
use uuid::Uuid;

#[derive(Debug, Clone)]
pub struct Flashcard {
    pub id: Uuid,
    pub question: String,
    pub answer: String,
    /// Das aktuelle Intervall in Tagen bis zur nächsten Abfrage
    pub interval_days: u32,
    /// Der Erleichterungsfaktor (Schwierigkeits-Multiplikator, Startwert z.B. 2.5)
    pub ease_factor: f32,
    /// Das konkrete Datum, an dem die Karte wieder vorgelegt werden soll
    pub next_review: NaiveDate,
}
```

### 2. Der SM-2 Algorithmus (SuperMemo 2)

Der SM-2-Algorithmus steuert, wie sich `interval_days` und `ease_factor` ändern, basierend auf deiner Selbsteinschätzung (Rating von 0 bis 5):

* **Bewertungsskala (0 - 5):**
  * `0`: Kompletter Blackout, keine Ahnung.
  * `1`: Falsche Antwort, aber bei der Lösung kam die Erinnerung.
  * `2`: Falsche Antwort, schien aber leicht erinnerbar.
  * `3`: Richtige Antwort mit großer Anstrengung.
  * `4`: Richtige Antwort nach kurzer Überlegung.
  * `5`: Perfekte Antwort ohne Zögern.

* **Regeln zur Berechnung:**
  1. Bei einer Bewertung `< 3` gilt die Karte als **nicht gewusst**: Das Intervall wird auf `1` Tag zurückgesetzt, der `ease_factor` bleibt unverändert oder sinkt leicht.
  2. Bei einer Bewertung `>= 3` gilt die Karte als **gewusst**:
     * 1. Wiederholung: `interval_days = 1`
     * 2. Wiederholung: `interval_days = 6`
     * Ab der 3. Wiederholung: `interval_days = (bisheriges_intervall * ease_factor)`
  3. **Anpassung des Ease Factors:**
     $$\text{ease\_factor}_{\text{neu}} = \text{ease\_factor}_{\text{alt}} + (0.1 - (5 - q) \cdot (0.08 + (5 - q) \cdot 0.02))$$
     *(wobei $q$ das Rating von 0 bis 5 ist)*.
     *Hinweis:* Der `ease_factor` sollte niemals unter den Minimalwert von `1.3` fallen!

---

## ⚙️ Code-Gerüst zum Selberbauen

Jetzt bist du an der Reihe! Nachfolgend findest du das Gerüst für die Kernlogik deines Anki-Trainers. Ergänze die Lücken überall dort, wo `todo!()` steht.

```rust
use chrono::{Local, NaiveDate, Days};
use uuid::Uuid;

#[derive(Debug, Clone)]
pub struct Flashcard {
    pub id: Uuid,
    pub question: String,
    pub answer: String,
    pub interval_days: u32,
    pub ease_factor: f32,
    pub next_review: NaiveDate,
}

impl Flashcard {
    pub fn new(question: String, answer: String) -> Self {
        let today = Local::now().date_naive();
        Self {
            id: Uuid::new_v4(),
            question,
            answer,
            interval_days: 0,
            ease_factor: 2.5,
            next_review: today,
        }
    }
}

pub struct StudySession {
    pub cards: Vec<Flashcard>,
}

impl StudySession {
    pub fn new(cards: Vec<Flashcard>) -> Self {
        Self { cards }
    }

    /// Liefert alle Karten zurück, die heute oder früher zur Wiederholung fällig sind.
    pub fn due_cards(&self) -> Vec<&Flashcard> {
        let today = Local::now().date_naive();
        // TODO: Filter die Karten in self.cards heraus, deren `next_review` <= today ist.
        todo!("Filtere fällige Karten heraus")
    }
}

/// Aktualisiert die Karteikarte basierend auf der Bewertungsqualität (0 bis 5).
pub fn calculate_next_review(card: &mut Flashcard, quality_rating: u8) {
    // Sicherstellen, dass das Rating im gültigen Bereich 0..=5 liegt
    assert!(quality_rating <= 5, "Rating muss zwischen 0 und 5 liegen!");

    let today = Local::now().date_naive();

    // TODO: Schritt 1 - Berechne den neuen `ease_factor`.
    // Formel: new_ease = old_ease + (0.1 - (5.0 - q) * (0.08 + (5.0 - q) * 0.02))
    // Achtung: Der ease_factor darf nicht kleiner als 1.3 werden! (Verwende .max(1.3))

    // TODO: Schritt 2 - Berechne das neue `interval_days`.
    // Denkanstoß:
    // - Wenn quality_rating < 3: Das Intervall wird auf 1 zurückgesetzt.
    // - Wenn quality_rating >= 3:
    //   - War interval_days 0? -> neues Intervall = 1
    //   - War interval_days 1? -> neues Intervall = 6
    //   - War interval_days >= 6? -> neues Intervall = (altes Intervall als f32 * new_ease) gerundet als u32

    // TODO: Schritt 3 - Setze `card.next_review` auf `today + Days::new(card.interval_days as u64)`.

    todo!("Implementiere die SM-2 Abfragedatum-Berechnung")
}

fn main() {
    println!("=== Anki Spaced-Repetition Trainer ===");

    let mut card = Flashcard::new(
        "Was ist Ownership in Rust?".to_string(),
        "Das Speichermanagement-Modell ohne GC.".to_string(),
    );

    println!("Start-Karte: {:?}", card);

    // Simulation einer erfolgreichen Abfrage mit Rating 4
    // calculate_next_review(&mut card, 4);
    // println!("Nach Abfrage: {:?}", card);
}
```

### Leitfragen für deine Implementierung:
1. Warum übergeben wir in `calculate_next_review` eine veränderbare Referenz (`&mut Flashcard`) statt die Karte zu konsumieren?
2. Was passiert, wenn ein Nutzer mehrmals hintereinander eine `0` eingibt? Wie verändert sich der `ease_factor` und das Intervall?
3. Wie verhält sich Rusts `f32` beim Multiplizieren und anschließenden Konvertieren zu `u32`? (Denke an Rundungen mit `.round()`).

---

## 🧪 Übungsaufgaben

Bringe deinen Trainer auf das nächste Level!

### 🟢 Leicht: Interaktives Hinzufügen neuer Karten
Erweitere dein CLI-Programm so, dass der Nutzer über die Konsole (`std::io::stdin()`) neue Fragen und Antworten eingeben kann. Erstelle daraus eine neue `Flashcard` und hänge sie an deine Kartenliste an.

### 🟡 Mittel: Anki-CSV-Export & Import
Implementiere eine Export-Funktion, die deine Kartenliste in ein CSV-Format schreibt (z. B. `Frage;Antwort;Intervall;EaseFactor;NächstesDatum`), sodass du deine Karten in den offiziellen Anki-Desktop-Client importieren kannst. Schreib auch die passende Import-Funktion!

### 🔴 Schwer: Fuzzy Matching bei Freitext-Antworten
Wenn der Nutzer im CLI-Trainer die Antwort frei eintippt, führen kleine Tippfehler (z. B. *"Owership"* statt *"Ownership"*) sofort zu einem Punktabzug.
* **Herausforderung:** Verwende den Levenshtein-Distanz-Algorithmus (oder ein Crate wie `strsim`), um die Ähnlichkeit zwischen der Benutzereingabe und der gespeicherten `answer` zu berechnen. Schlage bei einer Ähnlichkeit von > 85% vor, dass die Antwort trotz Tippfehler als richtig gewertet werden kann!

---

## 🎯 Zusammenfassung

Mit dem **Anki / Spaced-Repetition Trainer** hast du das Fundament für ein gedächtnisoptimiertes Lernwerkzeug gelegt. Du hast gesehen, wie mathematische Lernmodelle wie der SM-2-Algorithmus in elegante Rust-Datenstrukturen übersetzt werden. Kombiniere dieses Modul später mit deinen Markdown-Notizen oder dem Terminal-Wiki, um aus deinem Wissen ein dauerhaftes Power-Gehirn zu bauen!
