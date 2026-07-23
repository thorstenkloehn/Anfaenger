# 🎮 LMS-Erweiterung 1: Gamification & Open Badges Engine (XP, Streaks & Badges)

Im Hauptkapitel des Lernmanagementsystems (LMS) hast du das Fundament für Kurse, Lektionen und Quizzes gelegt. Nun verleihen wir deiner Lernplattform echte Magie: **Gamification**!

Lernen macht am meisten Spaß, wenn Fortschritte sofort sichtbar werden, tägliche Gewohnheiten belohnt werden und erreichte Meilensteine als fälschungssichere Zertifikate vorgezeigt werden können.

---

## 🚀 Einleitung & Vision: Die Kraft der Belohnungssysteme

Warum bleiben Menschen monatelang auf Sprachen-Lern-Apps oder in Videospielen am Ball? Der Schlüssel liegt in durchdachter **Gamification**:
- **Erfahrungspunkte (XP) & Level:** Geben sofortiges Feedback für jede absolvierte Lektion.
- **Streaks (Lernserien):** Fördern tägliches Lernen durch die Motivation, eine Serie nicht abreißen zu lassen.
- **Open Badges:** Verwandeln abstrakten Lernerfolg in digitale, verifizierbare Abzeichen nach internationalem Standard.

In diesem Kapitel erweiterst du dein Rust-LMS um eine flexible **Gamification & Open Badges Engine**, die motivierende Spielmechaniken mit kryptografisch verifizierbaren Zertifikaten verbindet.

---

## 🧠 Die Bildmetapher: Das Abzeichen-Heft & das Spielhallen-Scoreboard

Stell dir dein Gamification-System wie eine Kombination aus einem klassischen **Pfadfinder-Abzeichen-Heft** und einem **Highscore-Automaten** vor:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   GAMIFICATION & OPEN BADGES ENGINE                    │
│                                                                        │
│  1. [ Das Spielhallen-Scoreboard (XP & Level) ]                        │
│     ├── Jede Lektion gibt XP. Mehr XP = Höheres Level!                 │
│     └── Formel: Level = sqrt(XP / 100)                                 │
│                                                                        │
│  2. [ Die tägliche Stempelkarte (Streak Tracking) ]                    │
│     └── "Jeden Tag gelernt -> Streak wächst. Tag verpasst -> Reset!"   │
│                                                                        │
│  3. [ Das Pfadfinder-Abzeichenheft (Open Badges 2.0/3.0) ]             │
│     └── Verifizierte Medaillen für Meilensteine mit SHA-256 Hash       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ Architektur & Datenstrukturen

Für eine Gamification-Engine benötigen wir drei Datentypen: XP/Level, Streaks und Open Badges.

### 1. Die Open Badges Struktur (Standard 2.0/3.0)

Ein Open Badge ist ein JSON-LD basiertes Zertifikat, das aus drei Elementen besteht:
- **BadgeClass:** Beschreibt das Abzeichen (Name, Bild, Kriterien).
- **Issuer:** Wer stellt das Abzeichen aus? (z. B. Deine Rust-Akademie).
- **Assertion:** Der konkrete Nachweis für einen bestimmten Studenten mit Kryptohash.

```rust
use chrono::{DateTime, NaiveDate, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

/// Das verifizierbare Abzeichen-Zertifikat (Badge Assertion)
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BadgeAssertion {
    pub id: Uuid,
    pub recipient_hash: String, // SHA-256(Student Email + Salt)
    pub badge_class_id: String, // z. B. "badge:rust-async-master"
    pub issued_on: DateTime<Utc>,
    pub verification_hash: String,
}
```

### 2. Das Gamification-Profil des Studenten

```rust
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GamificationProfile {
    pub student_id: Uuid,
    pub xp: u32,
    pub streak_days: u32,
    pub last_active_date: Option<NaiveDate>,
    pub unlocked_badges: Vec<BadgeAssertion>,
}

impl GamificationProfile {
    pub fn new(student_id: Uuid) -> Self {
        Self {
            student_id,
            xp: 0,
            streak_days: 0,
            last_active_date: None,
            unlocked_badges: Vec::new(),
        }
    }

    /// Berechnet das aktuelle Level aus den Erfahrungspunkten (XP)
    /// Formel: Level = sqrt(XP / 100) + 1
    pub fn calculate_level(&self) -> u32 {
        ((self.xp as f64 / 100.0).sqrt() as u32) + 1
    }
}
```

---

## ⚙️ Code-Gerüst zum Selberbauen

Hier ist das didaktische Core-Gerüst für deine Gamification-Engine. Ergänze die Lücken überall dort, wo `todo!()` steht!

```rust
use chrono::NaiveDate;
use uuid::Uuid;

// (Datenstrukturen wie oben definiert)

#[derive(Debug, PartialEq)]
pub enum GamificationEvent {
    XpGained(u32),
    StreakIncreased(u32),
    StreakReset,
    BadgeUnlocked(String),
}

pub struct GamificationEngine;

impl GamificationEngine {
    /// Registriert die tägliche Lernaktivität eines Studenten, aktualisiert XP und Streaks.
    pub fn record_activity(
        profile: &mut GamificationProfile,
        today: NaiveDate,
        xp_earned: u32,
    ) -> Vec<GamificationEvent> {
        let mut events = Vec::new();

        // 1. XP hinzufügen
        profile.xp += xp_earned;
        events.push(GamificationEvent::XpGained(xp_earned));

        // 2. Streak-Logik auswerten
        // Leitfragen:
        // - Was passiert, wenn last_active_date == today? (Heute bereits gelernt -> Streak bleibt gleich)
        // - Was passiert, wenn last_active_date == today - 1 Tag? (Gestern gelernt -> Streak + 1!)
        // - Was passiert, wenn last_active_date < today - 1 Tag? (Tage übersprungen -> Streak reset auf 1!)

        todo!("Implementiere die Streak-Berechnung und Event-Generierung!")
    }

    /// Prüft, ob neue Open Badges freigeschaltet wurden (z. B. "7-Tage-Streak" oder "1000 XP")
    pub fn check_badge_eligibility(
        profile: &mut GamificationProfile,
        recipient_email: &str,
    ) -> Vec<BadgeAssertion> {
        // Leitfragen:
        // 1. Hat der Student 1000 XP erreicht und besitzt das Badge "badge:xp-1000" noch nicht?
        // 2. Erzeuge eine neue BadgeAssertion mit HMAC-Verification-Hash!

        todo!("Implementiere die automatisierte Badge-Freischaltung!")
    }
}

fn main() {
    println!("🎮 Gamification Engine Test");

    let student_id = Uuid::new_v4();
    let mut profile = GamificationProfile::new(student_id);

    println!("Start-Level: {}", profile.calculate_level());
}
```

---

## 🧪 Übungsaufgaben

Bringe dein Belohnungssystem auf Profi-Niveau!

### 🟢 Leicht: Das "Streak Freeze"-Item
Implementiere ein Inventar-Item `streak_freezes_available: u32`.
- **Ziel:** Wenn der Student 1 Tag aussetzt, aber ein `streak_freeze > 0` besitzt, wird das Freeze verbraucht, statt den Streak auf 0 zurückzusetzen.

### 🟡 Mittel: Dynamisches Leaderboard-Ranking
Schreibe eine Funktion `pub fn generate_leaderboard(profiles: &[GamificationProfile]) -> Vec<(&GamificationProfile, usize)>`.
- Sortiere alle Profile nach XP (absteigend) und erstelle ein Platzierungs-Ranking (Rang 1, Rang 2, ...).

### 🔴 Schwer: Kryptografischer Open-Badge-Generator
Erzeuge fälschungssichere Zertifikate:
- Implementiere eine Funktion `pub fn generate_verification_hash(assertion: &BadgeAssertion, secret_salt: &str) -> String`.
- **Denkanstoß:** Nutze `sha2` / `hmac`, um einen un-fälschbaren Hash aus `student_email + badge_class_id + issued_on` zu berechnen.

---

## 🎯 Zusammenfassung

Mit der **Gamification & Open Badges Engine** hast du moderne Belohnungs-Mechanismen verstanden:
- **XP & Level:** Kontinuierliche Motivationsschleife.
- **Streak-System:** Förderung täglicher Lern-Gewohnheiten.
- **Open Badges:** Verifizierbare, digitale Abzeichen für die Karriere der Lernenden.

Damit wird dein Rust-LMS zu einer mitreißenden Lernumgebung! 🎮🏆🚀
