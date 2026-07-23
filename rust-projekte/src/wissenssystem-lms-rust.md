# 🎓 Eigenes Lernmanagementsystem (LMS) in Rust bauen

In den bisherigen Kapiteln hast du gelernt, wie man Notizen verwaltet, Such-Graphen baut, Cheatsheets erstellt und KI-Bibliothekare anbindet. Nun gehen wir einen Schritt weiter in die didaktische Praxis: Wir bauen ein **eigenes Lernmanagementsystem (Learning Management System, LMS)** in Rust – ähnlich wie Moodle, Canvas oder Coursera!

---

## 🚀 Einleitung & Vision: Die digitale Lernplattform

Ein **LMS** ist die Steuerzentrale für modernes Lernen. Es organisiert Kurse, Lektionen, interaktive Quizzes und Verfolge den Lernfortschritt von Studenten in Echtzeit.

### Warum ein LMS in Rust bauen?
- **Hohe Nebenläufigkeit (Concurrency):** Wenn Hunderte Lernende gleichzeitig Quizzes ausfüllen oder Lektionen aufrufen, verarbeitet Rusts Axum/Tokio-Stack diese Anfragen ohne spürbare Verzögerung.
- **Typen-Sicherheit bei Prüfungen:** Der Rust-Compiler garantiert, dass Ergebnisse, Punkte und Fortschritts-Daten frei von Data Races oder Berechnungsfehlern sind.
- **Interaktive Code-Challenges:** Rust eignet sich hervorragend, um Code-Aufgaben von Lernenden sicher auszuwerten.

---

## 🧠 Die Bildmetapher: Der digitale Universitäts-Campus

Stell dir dein LMS wie einen modernen **universitären Campus** vor:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                     DER DIGITALE UNIVERSITÄTS-CAMPUS                   │
│                                                                        │
│  1. [ Der Hörsaal (`Course` & `Lesson`) ]                              │
│     ├── Vorlesungen, Videos, Text-Anleitungen                          │
│                                                                        │
│  2. [ Die Prüfungsstelle (`Quiz` & `Submission`) ]                     │
│     ├── Automatische Korrektur von Multiple-Choice & Code-Aufgaben     │
│                                                                        │
│  3. [ Das Studienbuch (`StudentProgress`) ]                            │
│     ├── Dokumentiert absolvierte Lektionen & berechnet Prozent-Balken    │
│                                                                        │
│  4. [ Das Rektorat (`LmsEngine` & Axum Web) ]                          │
│     └── Verwaltet Studenten, Zertifikate & Kurs-Freigaben              │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Der Hörsaal (`Course` & `Lesson`)**: Hier befinden sich geordnete Module und Lektionen – von den Grundlagen bis zu Fortgeschrittenen-Themen.
2. **Die Prüfungsstelle (`Quiz` & `Submission`)**: Prüft Antworten automatisch, vergibt Punkte und gibt sofortiges Feedback.
3. **Das Studienbuch (`StudentProgress`)**: Stempelt bestandene Lektionen ab und berechnet den Gesamterfolg (z. B. *"75% abgeschlossen"*).
4. **Das Rektorat (`LmsEngine`)**: Der zentrale Server, der alles zusammenhält und Zertifikate ausstellt.

---

## 🏗️ Architektur & Datenstrukturen

Ein LMS benötigt gut durchdachte Typen, um Kurse, Lektionen, Fragen und Fortschritte abzubilden.

### 1. Kurse & Lektionstypen

```rust
use uuid::Uuid;

/// Ein vollständiger Kurs im LMS
#[derive(Debug, Clone)]
pub struct Course {
    pub id: Uuid,
    pub title: String,
    pub description: String,
    pub modules: Vec<CourseModule>,
}

/// Ein Modul innerhalb eines Kurses (z. B. "Phase 1: Grundlagen")
#[derive(Debug, Clone)]
pub struct CourseModule {
    pub id: Uuid,
    pub title: String,
    pub lessons: Vec<Lesson>,
}

/// Verschiedene Arten von Lektionen
#[derive(Debug, Clone)]
pub enum LessonType {
    TextContent(String),
    VideoUrl(String),
    Quiz(QuizData),
    CodeChallenge { prompt: String, initial_code: String },
}

#[derive(Debug, Clone)]
pub struct Lesson {
    pub id: Uuid,
    pub title: String,
    pub content: LessonType,
}
```

### 2. Quizzes & Multiple-Choice

```rust
#[derive(Debug, Clone)]
pub struct QuizQuestion {
    pub question_text: String,
    pub options: Vec<String>,
    pub correct_option_index: usize,
}

#[derive(Debug, Clone)]
pub struct QuizData {
    pub questions: Vec<QuizQuestion>,
    pub passing_score_percent: u8,
}
```

### 3. Der studentische Lernfortschritt (`StudentProgress`)

```rust
use std::collections::{HashMap, HashSet};

#[derive(Debug, Clone, Default)]
pub struct StudentProgress {
    pub student_id: Uuid,
    pub course_id: Uuid,
    /// Alle IDs der erfolgreich absolvierten Lektionen
    pub completed_lesson_ids: HashSet<Uuid>,
    /// Testergebnisse pro Quiz-Lektion (Quiz-ID -> Erreichte Punkte in %)
    pub quiz_scores: HashMap<Uuid, u8>,
}
```

---

## ⚙️ Code-Gerüst zum Selberbauen

Hier ist das didaktische Core-Gerüst für dein LMS. Ergänze die Logik überall dort, wo `todo!()` steht!

```rust
use std::collections::{HashMap, HashSet};
use uuid::Uuid;

// (Datenstrukturen wie oben definiert)

pub struct LmsEngine {
    pub courses: HashMap<Uuid, Course>,
    pub student_progress: HashMap<(Uuid, Uuid), StudentProgress>, // (Student_ID, Course_ID) -> Progress
}

impl LmsEngine {
    pub fn new() -> Self {
        Self {
            courses: HashMap::new(),
            student_progress: HashMap::new(),
        }
    }

    /// Berechnet den aktuellen Fortschritt eines Studenten in einem Kurs in Prozent (0.0 bis 100.0)
    pub fn calculate_completion_percentage(&self, student_id: Uuid, course_id: Uuid) -> f32 {
        // Leitfragen:
        // 1. Wie ermittelst du die Gesamtzahl aller Lektionen in allen Modulen des Kurses?
        // 2. Wie viele dieser Lektionen-IDs befinden sich in progress.completed_lesson_ids?
        // 3. Wie verhinderst du eine Division durch 0, falls der Kurs 0 Lektionen hat?

        todo!("Implementiere die Prozent-Fortschritts-Berechnung")
    }

    /// Wertet ein eingereichtes Quiz aus und gibt die erreichten Punkte in Prozent zurück (0 bis 100)
    pub fn evaluate_quiz_submission(&mut self, student_id: Uuid, course_id: Uuid, quiz_lesson_id: Uuid, quiz: &QuizData, submitted_answers: &[usize]) -> u8 {
        // Leitfragen:
        // 1. Wie vergleichst du submitted_answers mit question.correct_option_index?
        // 2. Erreichte Prozent = (Anzahl Richtige * 100) / Gesamtfragen.
        // 3. Wenn Prozent >= quiz.passing_score_percent: Trage quiz_lesson_id in completed_lesson_ids ein!

        todo!("Implementiere die automatische Quiz-Auswertung")
    }
}

fn main() {
    println!("🎓 Willkommen zum Rust-LMS Engine Test!");

    let mut lms = LmsEngine::new();
    let student_id = Uuid::new_v4();
    let course_id = Uuid::new_v4();

    // TODO: Erstelle einen Testkurs und teste die Fortschritts-Berechnung!
}
```

---

## 🧪 Übungsaufgaben

Bringe dein Lernmanagementsystem zur Reife!

### 🟢 Leicht: Visueller Fortschrittsbalken (HTML / CLI)
Schreibe eine Hilfsfunktion `pub fn render_progress_bar(percentage: f32) -> String`.
- **Ziel:** Erzeuge einen schicken Fortschrittsbalken für die Konsole oder HTML:
  `[████████████░░░░░░░░] 60.0%`

### 🟡 Mittel: Code-Challenge Evaluator mit `todo!()`-Prüfung
Baue ein Modul für interaktive Programmieraufgaben:
- Der Student reicht seinen Rust-Code ein.
- Dein LMS prüft, ob der Code noch ein `todo!()` enthält oder ob der Compiler den Code akzeptiert.
- **Denkanstoß:** Wie kannst du `cargo check` per `std::process::Command` im Hintergrund ausführen?

### 🔴 Schwer: Automatische Zertifikats-Generierung
Wenn `calculate_completion_percentage` exakt `100.0%` erreicht:
- Generiere ein diplomähnliches Dokument (als Markdown, HTML oder SVG-Zertifikat) mit Name des Studenten, Kursname, Datum und Verifikations-Hash.

---

## 🎯 Zusammenfassung

Mit dem **eigenen Lernmanagementsystem in Rust** hast du didaktische Software-Architektur gemeistert:
- **Modularer Aufbau:** Kurse, Module, Lektionen und Quizzes sauber strukturiert.
- **Fortschritts-Tracking:** Effizientes Nachverfolgen von Lernerfolgen mit `HashSet` und `HashMap`.
- **Automatische Korrektur:** Sofortige Auswertung von Tests und Code-Einreichungen.

Du besitzt nun ein vollständiges Fundament, um eigene Online-Kurse und Schulungssysteme in Rust anzubieten! 🎓🚀
