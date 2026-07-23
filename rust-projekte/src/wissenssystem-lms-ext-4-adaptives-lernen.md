# 🧠 LMS-Erweiterung 4: Adaptives Lernen & Dynamische Lernpfade

Willkommen zur vierten Erweiterung unseres Lernmanagementsystems (LMS) in Rust! In den vorherigen Teilen hast du gelernt, wie man Kurse strukturiert, Prüfungen bewertet und Gamification-Elemente wie Abzeichen und Bestenlisten einbaut. 

Nun widmen wir uns der Königsdisziplin der modernen Bildungs-Technologie: **Adaptives Lernen (Adaptive Learning)**. Statt allen Lernenden starr denselben Weg vorzuschreiben, passt sich unser LMS dynamisch an das individuelle Tempo, die Stärken und die Wissenslücken jedes Einzelnen an.

---

## 🚀 Einleitung & Vision: Maßgeschneidertes Lernen für jeden Student

Stell dir vor, du besuchst eine Vorlesung mit 500 Studierenden. Der Professor liest Folie für Folie ab – im genau gleichen Tempo für alle. Für Anfänger ist es oft zu schnell, für Fortgeschrittene langweilig.

**Die Vision des adaptiven LMS:**
Jeder Lernende erhält einen **maßgeschneiderten, dynamischen Lernpfad**:
- Wer das Konzept von Rust-Ownership auf Anhieb versteht, muss nicht 10 Einführungslektionen durcharbeiten, sondern springt direkt zu komplexeren Themen (**Acceleration** / Beschleunigung).
- Wer dagegen bei Lifetimes oder Referenzen ins Straucheln gerät, bekommt automatisch gezielte Wiederholungsaufgaben und Auffrischungslektionen eingeblendet (**Remediation** / Förderung), bevor die nächste schwere Hürde genommen werden muss.

### Warum Rust für Adaptive Engines?
Adaptive Algorithmen müssen bei jeder beantworteten Frage im Hintergrund komplexe Graphen analysieren und Wahrscheinlichkeiten berechnen. Dank Rusts **hoher Performance** und **Typensicherheit** können wir tausende parallele Lernpfade in Echtzeit berechnen – ganz ohne Garbage-Collection-Pausen oder unerwartete `null`-Referenzen im Wissensstand!

---

## 🧠 Die Bildmetapher: Der weise Privatlehrer beim Einzelunterricht

Stell dir unser adaptives LMS wie einen **weisen Privatlehrer** vor, der beim Lernen neben dir sitzt:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                     DIE ADAPTIVE LEARNING ENGINE                       │
│                                                                        │
│  1. [ Das Kompetenz-Skelett (`MasteryMap`) ]                           │
│     └── Misst den aktuellen Kenntnisstand für jedes Thema (0.0 bis 1.0)│
│                                                                        │
│  2. [ Die Pfad-Weiche (`DynamicBranching`) ]                           │
│     ├── Score < 0.6  ──► 🔄 Remediation (Auffrischungs-Modul)         │
│     ├── Score 0.6-0.9 ──► ➡️ Standard-Lernpfad weiterverfolgen         │
│     └── Score > 0.9  ──► 🚀 Acceleration (Überspringen & Profi-Task) │
│                                                                        │
│  3. [ Die KI-Einschätzung (`Bayesian Knowledge Tracing / BKT`) ]       │
│     └── Berechnet Wahrscheinlichkeiten für "Echtes Können" vs. "Raten" │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ Architektur & Adaptive Engine

Eine Adaptive Learning Engine basiert auf drei Säulen:

### 1. Der Kompetenz-Graph (`StudentMastery`)

Der Wissensstand eines Studenten wird als Zuordnung von **Skills** (Fähigkeiten) zu **Mastery-Scores** (0.0 = keine Ahnung, 1.0 = Meister) modelliert.

```rust
use std::collections::HashMap;
use uuid::Uuid;

/// Der Wissensstand eines Studenten über verschiedene Fähigkeiten
#[derive(Debug, Clone, Default)]
pub struct StudentMastery {
    pub student_id: Uuid,
    /// Skill-Name (z. B. "rust_ownership", "rust_lifetimes") -> Score (0.0 bis 1.0)
    pub skill_scores: HashMap<String, f32>,
}

/// Empfehlung des Systems für die nächste Lektion
#[derive(Debug, PartialEq)]
pub enum NextRecommendation {
    /// Nächste reguläre Lektion
    StandardLesson(Uuid),
    /// Förderungs-Lektion bei Wissenslücken (Remediation)
    RemediationLesson { lesson_id: Uuid, skill: String },
    /// Fortgeschrittene Lektion / Überspringen (Acceleration)
    AccelerationLesson(Uuid),
    /// Kurs abgeschlossen!
    CourseCompleted,
}
```

### 2. Bayesian Knowledge Tracing (BKT)
Um zu verhindern, dass ein zufällig richtig geratenes Multiple-Choice-Quiz fälschlicherweise als "Meisterschaft" gewertet wird, nutzt man **BKT**:

- $P(L_0)$: Initiales Wissen
- $P(T)$: Wahrscheinlichkeit zu lernen
- $P(G)$: Wahrscheinlichkeit richtig zu **raten** (Guess)
- $P(S)$: Wahrscheinlichkeit sich trotz Wissen zu **vertippen** (Slip)

---

## ⚙️ Code-Gerüst zum Selberbauen

Hier ist das didaktische Core-Gerüst für deine Adaptive Learning Engine. Ergänze die Lücken überall dort, wo `todo!()` steht!

```rust
use std::collections::HashMap;
use uuid::Uuid;

// (Datenstrukturen wie oben definiert)

pub struct CourseGraph {
    pub lessons: HashMap<Uuid, LessonRequirement>,
}

pub struct LessonRequirement {
    pub lesson_id: Uuid,
    pub primary_skill: String,
    pub required_mastery: f32, // z.B. 0.7
}

pub struct AdaptiveEngine;

impl AdaptiveEngine {
    /// Empfiehlt die nächste optimale Lektion für den Studenten basierend auf seiner MasteryMap
    pub fn recommend_next_lesson(
        student: &StudentMastery,
        current_lesson_id: Uuid,
        lesson_req: &LessonRequirement,
        quiz_score_percent: f32,
    ) -> NextRecommendation {
        let current_skill = &lesson_req.primary_skill;
        let current_mastery = *student.skill_scores.get(current_skill).unwrap_or(&0.0);

        // Leitfragen:
        // 1. Wenn quiz_score_percent < 60.0: Der Student hat Schwierigkeiten!
        //    -> Gebe NextRecommendation::RemediationLesson zurück.
        // 2. Wenn quiz_score_percent >= 95.0 und current_mastery > 0.8: Exzellent!
        //    -> Gebe NextRecommendation::AccelerationLesson zurück.
        // 3. Sonst -> Nächste Standard-Lektion!

        todo!("Implementiere die adaptive Empfehlungs-Logik!")
    }

    /// Aktualisiert den Mastery-Score nach BKT (Bayesian Knowledge Tracing)
    pub fn update_bkt_mastery(prior_p: f32, answered_correctly: bool) -> f32 {
        let p_guess = 0.20; // 20% Chance zu raten
        let p_slip = 0.10;  // 10% Chance für Vertippen
        let p_transit = 0.15; // 15% Lernfortschritt

        // TODO: Berechne P(L | Ans) via Bayes-Theorem und addiere P(T) für den neuen Score!

        todo!("Implementiere das bayesianische Wissensupdate!")
    }
}

fn main() {
    println!("🧠 Adaptive Learning Engine Test");

    let student = StudentMastery::default();
    println!("Aktuelle Skills: {:?}", student.skill_scores);
}
```

---

## 🧪 Übungsaufgaben

Bringe deine Adaptive Engine auf Experten-Niveau!

### 🟢 Leicht: Schwellenwert-Prüfung (`MasteryThresholdCheck`)
Implementiere eine Hilfsfunktion `pub fn is_skill_mastered(student: &StudentMastery, skill: &str, threshold: f32) -> bool`.

### 🟡 Mittel: Automatisches Auffrischungs-Modul
Erstelle ein System, das bei Unterschreitung eines Schwellenwertes automatisch eine Liste von 3 gezielten Übungsaufgaben generiert.

### 🔴 Schwer: Bayesian Knowledge Tracing (BKT) Update
Implementiere die mathematisch exakte BKT-Formel für `update_bkt_mastery`.
- **Formel bei korrekter Antwort:**
  $$P(L | Right) = \frac{P(L) \cdot (1 - P(S))}{P(L) \cdot (1 - P(S)) + (1 - P(L)) \cdot P(G)}$$
- **Neuer Score:** $P(L_{neu}) = P(L | Right) + (1 - P(L | Right)) \cdot P(T)$

---

## 🎯 Zusammenfassung

Mit der **Adaptive Learning Engine** schließt du die LMS-Erweiterungsserie ab:
- **Individuelles Tempo:** Kein Student wird über- oder unterfordert.
- **Dynamic Branching:** Automatische Förderung (Remediation) und Beschleunigung (Acceleration).
- **BKT-Mathematik:** Stochastische Modellierung von echtem Wissen vs. Zufallstreffern.

Damit ist dein Rust-LMS auf dem modernsten Stand pädagogischer Software-Architektur! 🧠🎓🚀
