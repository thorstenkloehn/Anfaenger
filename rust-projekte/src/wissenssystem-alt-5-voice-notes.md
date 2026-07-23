# 🎙️ Alternativ-System 5: Das Voice-Notes & Audio-Wissensarchiv (Whisper FFI)

Manchmal fliegen Gedanken schneller durch deinen Kopf, als deine Finger auf der Tastatur tippen können. Vielleicht bist du gerade unterwegs, machst einen Spaziergang oder hast beim Kaffeekochen eine zündende Idee für dein nächstes Rust-Projekt. Wäre es nicht genial, deine Gedanken einfach einzusprechen und dein eigenes Wissenssystem wandelt die Sprachaufnahme automatisch in durchsuchbaren, strukturierten Text um?

In diesem Kapitel bauen wir ein **Voice-Notes & Audio-Wissensarchiv**. Du lernst, wie Rust mit externen C-Bibliotheken kommuniziert (Foreign Function Interface, FFI), wie Audiodaten verarbeitet werden und wie du ein lokales Speech-to-Text-Modell (*Whisper*) in deinen Rust-Code einbindest.

---

## 🧠 Die Bildmetapher: Der persönliche Diktier-Sekretär

Stelle dir vor, du hast einen persönlichen Diktier-Sekretär an deiner Seite:

1. **Aufnahme (Diktiergerät):** Du drückst auf Aufnahme und sprichst frei heraus – unstrukturiert, spontan und ungefiltert.
2. **Transkription (Die fleißige Schreibkraft):** Dein Sekretär hört sich die Aufnahme an, übersetzt jedes gesprochene Wort hochpräzise in geschriebenen Text und korrigiert Satzzeichen.
3. **Archivierung (Der Sortierer):** Das fertige Transkript bekommt einen eindeutigen Stempel (ID & Datum), verweist auf die originale Audiodatei und landet geordnet in deinem digitalen Notizbuch.

In unserer Rust-Anwendung übernimmt die C-Bibliothek **`whisper.cpp`** die Rolle des blitzschnellen Schreibers. Rust selbst fungiert als der organisierte Sekretär, der die Dateien verwaltet, Fehler abfängt und für einen sicheren Ablauf sorgt.

```
 [ 🎙️ Spracheingabe ]
          │
          ▼
 [ 📻 Audio (WAV) ] ── (cpal / hound)
          │
          ▼
 [ 🧠 Whisper (C-FFI) ] ── (Lokale KI-Transkription)
          │
          ▼
 [ 📝 VoiceNote Struct ] ── (UUID, Timestamp, Transkript)
          │
          ▼
 [ 🗄️ Wissensarchiv ]
```

---

## 🏗️ Architektur & FFI-Anbindung

Um dieses System zu realisieren, verknüpfen wir drei Kernkomponenten miteinander:

### 1. Audioaufnahme & WAV-Verarbeitung (`cpal` & `hound`)
* **Audio-Capturing:** Über die Rust-Crate `cpal` (Cross-Platform Audio Library) kannst du auf das Mikrofon deines Computers zugreifen und kontinuierlich Audiosamples einlesen.
* **Dateiformat:** Mit `hound` speicherst du diese Samples als standardisierte WAV-Datei ab.
* *Denkanstoß:* Welches Sample-Format erwartet das KI-Modell? Whisper arbeitet am liebsten mit **16 kHz PCM Mono-Audiodaten** (16-Bit Float oder Integer). Wenn deine Aufnahme in Stereo (2 Kanäle) oder 44.1 kHz vorliegt, musst du die Daten vor der Verarbeitung konvertieren oder anpassen!

### 2. Transkription via C-FFI (Whisper)
Whisper von OpenAI ist eines der leistungsfähigsten Open-Source Speech-to-Text-Modelle. Da der performante Core in C/C++ (`whisper.cpp`) geschrieben ist, nutzen wir Rusts **Foreign Function Interface (FFI)**.
* **Was ist FFI?** FFI erlaubt es Rust, Funktionen aufzurufen, die in einer anderen Sprache (wie C) geschrieben wurden.
* **Sicherheit:** C-Code kennt Rusts strenge Ownership- und Borrow-Checker-Regeln nicht. Aufrufe über FFI finden daher in `unsafe`-Blöcken statt. 
* **Rust-Bindings:** Crates wie `whisper-rs` liefern uns sichere Abstraktionen ("Safe Wrapper"), sodass wir in unserem Hauptcode keinen manuellen `unsafe`-Code schreiben müssen.

### 3. Integration ins Wissenssystem
Sobald Whisper den Text zurückliefert, bauen wir daraus ein strukturiertes Notiz-Objekt. So bleibt die Verbindung zwischen Audiodatei, Text und Metadaten stets erhalten.

---

## ⚙️ Code-Gerüst

Hier siehst du die Grundstruktur deines Audio-Wissensarchivs. Fordere dich selbst heraus und fülle die Methodenkörper mit Leben!

```rust
use std::error::Error;
use std::path::{Path, PathBuf};
use std::time::SystemTime;

/// Repräsentiert eine verarbeitete Sprachnotiz im Wissensarchiv.
#[derive(Debug)]
pub struct VoiceNote {
    /// Eindeutige ID der Notiz (z. B. UUID v4)
    pub id: String,
    /// Pfad zur aufgenommenen WAV-Datei
    pub audio_path: PathBuf,
    /// Das von Whisper generierte Transkript
    pub transcript: String,
    /// Erstellungszeitpunkt der Aufnahme
    pub timestamp: SystemTime,
}

impl VoiceNote {
    /// Erstellt eine neue VoiceNote aus einer vorhandenen Audiodatei.
    pub fn new(audio_path: PathBuf, transcript: String) -> Self {
        todo!("Erzeuge ein neues VoiceNote-Struct mit eindeutiger ID und Zeitstempel")
    }

    /// Speichert die VoiceNote als Markdown-Datei im Archiv.
    pub fn save_to_archive(&self, archive_dir: &Path) -> Result<(), Box<dyn Error>> {
        todo!("Formatiere Metadaten und Transkript als Markdown und schreibe die Datei")
    }
}

/// Transkribiert eine Audiodatei unter Verwendung des lokalen Whisper-Modells via FFI.
///
/// # Argumente
/// * `audio_file` - Pfad zur `.wav`-Datei (muss 16kHz Mono sein)
/// * `model_path` - Pfad zur Whisper-Modelldatei (z.B. ggml-base.bin)
pub fn transcribe_audio(
    audio_file: &Path,
    model_path: &Path,
) -> Result<String, Box<dyn Error>> {
    // 💡 Leitfragen für deine Umsetzung:
    // 1. Existiert die Audiodatei unter dem angegebenen Pfad?
    // 2. Wie initialisierst du den WhisperContext aus dem Modell-Pfad?
    // 3. Wie übergibst du die PCM-Audio-Samples an den Whisper-State?
    // 4. Wie wandelst du die erzeugten Segmente in einen gesammelten String um?
    
    todo!("Implementiere die Transkription mit whisper-rs oder einer FFI-Anbindung")
}

fn main() -> Result<(), Box<dyn Error>> {
    println!("🎙️ Voice-Notes Wissensarchiv CLI");

    let audio_path = PathBuf::from("examples/sample_note.wav");
    let model_path = PathBuf::from("models/ggml-base.bin");

    // Denkanstoß: Prüfe vor dem Aufruf, ob die Beispieldateien existieren!
    // let transcript = transcribe_audio(&audio_path, &model_path)?;
    // let note = VoiceNote::new(audio_path, transcript);

    println!("Bereit zur Implementierung!");
    Ok(())
}
```

---

## 🧪 Übungsaufgaben

Testen wir dein Verständnis! Versuche die folgenden Features für dein Audio-Archiv zu entwickeln:

### 🟢 Leicht: Audio-Dauer ermitteln
Implementiere eine Hilfsfunktion `fn get_audio_duration(path: &Path) -> Result<f64, Box<dyn Error>>`.
* **Hinweis:** Nutze das `hound`-Crate, um den WAV-Header zu lesen.
* **Formel:** `Gesamtzahl der Samples / (Sample-Rate * Anzahl der Kanäle)`.
* Gib die Dauer in Sekunden zurück und speichere sie als zusätzliches Feld `duration_secs: f64` in deiner `VoiceNote`.

### 🟡 Mittel: Stille-Erkennung (Voice Activity Detection - VAD)
Oft entstehen bei Aufnahmen lange Pausen vor oder nach dem Sprechen.
* Schreiben eine Funktion `fn trim_silence(samples: &[f32], threshold: f32) -> Vec<f32>`.
* **Idee:** Durchlaufe die Audiosamples und entferne Abschnitte am Anfang und Ende, deren Lautstärke (Amplitude) unter einem Schwellenwert (`threshold`) liegt.
* **Vorteil:** Das spart Rechenzeit bei der Whisper-Transkription!

### 🔴 Schwer: KI-Zusammenfassung & Auto-Tagging
Erweitere das Archiv um eine automatische Analyse des Transkripts.
* Erstelle ein Modul `summarizer`, das den transkribierten Text nimmt und an ein lokales LLM (z. B. via `llama-cpp-rs` oder ein lokales Ollama-REST-API-Interface) sendet.
* **Ziel:** Generiere automatisch:
  1. Eine prägnante Überschrift (3-6 Wörter).
  2. Eine 2-Satz-Zusammenfassung der Idee.
  3. Automatische Tags (z. B. `#rust`, `#idee`, `#einkaufsliste`).

---

## 🎯 Zusammenfassung

In diesem Kapitel hast du den Grundstein für ein modernes Audio-Wissensarchiv gelegt:
* Du hast gelernt, wie **Audio-Pipelines** in Rust aufgebaut sind (`cpal` für Aufnahmen, `hound` für WAV-I/O).
* Du weißt, wie Rust über **FFI (Foreign Function Interface)** mächtige C/C++-Bibliotheken wie `whisper.cpp` nutzen kann.
* Du hast eine Datenstruktur entworfen, die Audiodaten, Transkripte und Metadaten nahtlos in ein strukturiertes Archiv überführt.

Mit diesem System verlierst du nie wieder einen spontanen Gedanken – deine Stimme wird direkt zu durchsuchbarem Wissen! 🚀
