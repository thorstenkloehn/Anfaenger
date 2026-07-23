# 📐 Profi-Baustein 3: Die eigene Vektor-Datenbank (Embeddings & Kosinus-Ähnlichkeit)

Willkommen beim dritten Profi-Baustein deines Wissenssystems! In den vorherigen Stufen hast du gelernt, wie du Notizen erstellst, verknüpfst und ein klassisches RAG-System (Retrieval-Augmented Generation) mit einem KI-Modell verbindest. 

Bisher verließ sich die Suche nach passenden Notizen meist auf die **exakte Stichwortsuche** (wie `grep` oder BM25). Doch was passiert, wenn du nach *"Speicherverwaltung in Rust"* suchst, in deinen Notizen aber das Wort *"Ownership & Borrowing"* steht? Eine klassische Stichwortsuche findet hier nichts.

In diesem Kapitel baust du deine **eigene In-Memory Vektor-Datenbank in Rust**. Du lernst, wie du semantische Bedeutungen in mathematische Vektoren umwandelst und mit der **Kosinus-Ähnlichkeit** die am besten passenden Dokumente blitzschnell findest – komplett lokal, datenschutzkonform und ohne teure Cloud-Dienste!

---

## 🚀 Einleitung & Vision: Semantische Suche ohne externe Cloud-Kosten

Klassische Suchmaschinen vergleichen Buchstaben. **Semantische Suchmaschinen** vergleichen Bedeutungen.

Wenn du eine Vektor-Datenbank selbst in Rust implementierst, profitierst du von unzähligen Vorteilen:
1. **⚡ Maximale Performance:** Rusts extrem schnelle Speicherzugriffe und Zero-Cost-Abstraktionen ermöglichen tausende Vektorvergleiche in wenigen Mikrosekunden.
2. **🔒 100 % Datenschutz & Zero Cloud-Kosten:** Keine monatlichen Gebühren für kommerzielle Vektor-Datenbanken (wie Pinecone oder Qdrant Cloud). Deine sensiblen Notizen verlassen niemals deinen Rechner.
3. **💡 Tiefes Systemverständnis:** Wer einmal die Mathematik hinter Vektor-Embeddings selbst in Code gegossen hat, versteht moderne KI-Architekturen auf einem völlig neuen Level.

---

## 🧠 Die Bildmetapher: Sternenkarte der Bedeutungen im Raum

Stell dir dein gesamtes Wissen wie ein **dreidimensionales Universum** voller Sterne vor:

```text
┌────────────────────────────────────────────────────────────────────────┐
│               DAS UNIVERSUM DER BEDEUTUNGEN (VECTOR SPACE)             │
│                                                                        │
│     (Software / Rust)                                                  │
│         ★ "Ownership & Borrowing"                                      │
│        /                                                               │
│       ★ "Speicherverwaltung in Rust"                                   │
│                                                                        │
│                                           (Tiere / Natur)              │
│                                               ★ "Katze schnurrt"       │
│                                              /                         │
│                                             ★ "Hund bellt laut"        │
│                                                                        │
│  📌 Suche nach "Memory Management":                                    │
│     Der Such-Vektor zeigt fast exakt in die Richtung von              │
│     "Speicherverwaltung"!                                              │
└────────────────────────────────────────────────────────────────────────┘
```

- **Jeder Gedanke ist ein Stern:** Jede deiner Notizen bekommt eine genaue Koordinate in diesem Universum.
- **Nahe beieinander liegende Themen:** Notizen über *"Hund"* und *"Katze"* stehen nah beieinander im Bereich "Tiere". Notizen über *"Rust Mutex"* und *"Thread Safety"* stehen gemeinsam in der Galaxie "Nebenläufigkeit".
- **Die Ausrichtung bestimmt die Bedeutung:** Wenn du eine Frage stellst, wandelt ein KI-Modell deinen Suchtext in einen neuen "Such-Stern" um. Deine Aufgabe ist es nun, zu messen, welche existierenden Sterne am engsten in dieselbe Richtung zeigen!

In der Realität nutzen moderne AI-Modelle statt nur 3 Dimensionen (X, Y, Z) oft **384, 768 oder 1536 Dimensionen**. Die mathematische Idee bleibt jedoch exakt dieselbe!

---

## 🏗️ Architektur & Vektor-Mathematik

### 1. Was sind Embeddings?
Ein **Embedding** ist ein Vektor aus Gleitkommazahlen (in Rust: `Vec<f32>`). Jeder Zahlenwert im Vektor repräsentiert das Gewicht einer bestimmten abstrakten Eigenschaft (Dimension) des Textes.

Ein einfaches Embedding mit 4 Dimensionen könnte abstrakt so aussehen:
```text
Text: "Rust ist schnell"  ──>  [ 0.85,  -0.12,   0.43,   0.91 ]
Text: "C++ Performance"  ──>  [ 0.82,  -0.08,   0.39,   0.88 ]
Text: "Apfelkuchen"      ──>  [-0.45,   0.93,  -0.11,  -0.05 ]
```

---

### 2. Kosinus-Ähnlichkeit (Cosine Similarity) & Skalarprodukt

Um zu bestimmen, wie ähnlich sich zwei Vektoren $\mathbf{A}$ und $\mathbf{B}$ sind, messen wir den **Kosinus des Winkels $\theta$** zwischen ihnen.

#### Die mathematische Formel:

$$\text{cos}(\theta) = \frac{\mathbf{A} \cdot \mathbf{B}}{\|\mathbf{A}\| \|\mathbf{B}\|} = \frac{\sum_{i=1}^n A_i B_i}{\sqrt{\sum_{i=1}^n A_i^2} \cdot \sqrt{\sum_{i=1}^n B_i^2}}$$

- **Skalarprodukt ($\mathbf{A} \cdot \mathbf{B}$):** Summe aller produktweisen Multiplikationen ($A_1 B_1 + A_2 B_2 + \dots + A_n B_n$).
- **Vektor-Länge / Norm ($\|\mathbf{A}\|$):** Die Euklidische Länge des Vektors ($\sqrt{\sum A_i^2}$).
- **Wertebereich der Kosinus-Ähnlichkeit:**
  - `1.0`: Identische Richtung (maximale Ähnlichkeit).
  - `0.0`: Orthogonal / Rechtwinklig (keinerlei semantischer Zusammenhang).
  - `-1.0`: Exakt entgegengesetzte Richtung.

> 💡 **Tipp:** Wenn die Vektoren bereits **normalisiert** sind (ihre Länge $\|\mathbf{A}\|$ beträgt genau `1.0`), vereinfacht sich die Kosinus-Ähnlichkeit zum reinen **Skalarprodukt**!

---

### 3. In-Memory Vektor-Index & k-Nearest Neighbors (k-NN)

Dein Vektor-Index speichert eine Liste aller Dokumente samt ihren Embeddings. Bei einer Suchanfrage führt er eine **k-Nearest-Neighbors (k-NN)** Suche durch:

```text
┌──────────────┐    1. Suchtext       ┌────────────────────────┐
│   Nutzer     ├─────────────────────►│ Embedding Model / API  │
└──────────────┘                      └──────────┬─────────────┘
                                                 │
                                        2. Query-Vektor Vec<f32>
                                                 ▼
┌──────────────────────────────────────────────────────────────┐
│ VectorIndex (In-Memory Datenstruktur)                        │
│                                                              │
│  [ Doc 1 ] ──> Vec<f32> ──┐                                  │
│  [ Doc 2 ] ──> Vec<f32> ──┼─► Berechne Kosinus-Ähnlichkeit   │
│  [ Doc 3 ] ──> Vec<f32> ──┘   & Sortiere nach Score          │
└──────────────┬───────────────────────────────────────────────┘
               │
       3. Die k besten Treffer
               ▼
┌──────────────────────────────┐
│ Vec<SearchResult> (Top-K)    │
└──────────────────────────────┘
```

---

## ⚙️ Code-Gerüst mit `todo!()`

Implementiere deine eigene Vektor-Datenbank! Nutze die folgenden Vorgaben und ersetze die `todo!()`-Makros durch deine Logik.

### 1. Datenstrukturen für Dokumente und Suchergebnisse

```rust
use uuid::Uuid;

/// Ein Notiz-Dokument mit eindeutiger ID, Text und Vektor-Embedding
#[derive(Debug, Clone)]
pub struct VectorDocument {
    pub id: Uuid,
    pub text: String,
    pub embedding: Vec<f32>,
}

/// Das Ergebnis einer Ähnlichkeitssuche
#[derive(Debug, Clone)]
pub struct SearchResult<'a> {
    pub document: &'a VectorDocument,
    pub score: f32, // Kosinus-Ähnlichkeit (meist zwischen 0.0 und 1.0)
}

/// Der In-Memory Vektor-Index
#[derive(Debug, Default)]
pub struct VectorIndex {
    documents: Vec<VectorDocument>,
}
```

---

### 2. Mathematik: Kosinus-Ähnlichkeit berechnen

```rust
/// Berechnet die Kosinus-Ähnlichkeit zwischen zwei Vektoren.
/// 
/// Denkanstöße für deine Implementierung:
/// 1. Was passiert, wenn v1 und v2 unterschiedliche Längen (Dimensionen) haben? (Fehler oder 0.0?)
/// 2. Wie berechnest du das Skalarprodukt (dot product) am besten mit Iteratoren (`zip`)?
/// 3. Wie berechnest du die Länge (Norm) jedes Vektors?
/// 4. Wie verhinderst du eine Division durch 0.0, falls ein Vektor nur aus Nullen besteht?
pub fn cosine_similarity(v1: &[f32], v2: &[f32]) -> f32 {
    if v1.len() != v2.len() || v1.is_empty() {
        return 0.0;
    }

    // TODO: Berechne das Skalarprodukt: sum(v1[i] * v2[i])
    // TODO: Berechne norm_v1: sqrt(sum(v1[i]^2))
    // TODO: Berechne norm_v2: sqrt(sum(v2[i]^2))
    // TODO: Gib dot_product / (norm_v1 * norm_v2) zurück

    todo!("Implementiere die Kosinus-Ähnlichkeit mit Rust-Iteratoren!")
}
```

---

### 3. Der In-Memory Vektor-Index mit k-NN Suche

```rust
impl VectorIndex {
    /// Erstellt einen neuen, leeren Index
    pub fn new() -> Self {
        Self {
            documents: Vec::new(),
        }
    }

    /// Fügt ein neues Vektor-Dokument zum Index hinzu
    pub fn add(&mut self, doc: VectorDocument) {
        self.documents.push(doc);
    }

    /// Sucht die `k` ähnlichsten Dokumente für einen vorgegebenen Such-Vektor (Query Vector).
    ///
    /// Denkanstöße für deine Implementierung:
    /// 1. Iteriere über `self.documents`.
    /// 2. Berechne für jedes Dokument den `score` via `cosine_similarity(query_vec, &doc.embedding)`.
    /// 3. Speichere `SearchResult { document: doc, score }` in einem `Vec`.
    /// 4. Sortiere die Ergebnisse absteigend nach dem `score` (Achtung mit `f32` und `partial_cmp`).
    /// 5. Begrenze das Ergebnis auf die ersten `k` Elemente (z. B. mit `truncate` oder `take`).
    pub fn search_nearest<'a>(&'a self, query_vec: &[f32], k: usize) -> Vec<SearchResult<'a>> {
        // TODO: Berechne die Scores für alle Dokumente
        // TODO: Sortiere absteigend nach Score
        // TODO: Gib die Top-k Treffer zurück
        
        todo!("Implementiere die k-NN Vektorsuche!")
    }
}
```

---

## 🧪 Übungsaufgaben

### 🏋️ Leicht: Vektor-Normalisierung (`normalize`)
Schreibe eine Funktion `pub fn normalize(v: &mut [f32])`, die einen Vektor so skaliert, dass seine euklidische Länge exakt `1.0` beträgt.
- **Leitfrage:** Warum vereinfacht sich die Kosinus-Ähnlichkeit extrem, wenn du alle Embeddings direkt beim Einfügen in den Index normalisierst?

---

### 🏃 Mittel: Euklidische Distanz vs. Kosinus-Ähnlichkeit
Implementiere eine zweite Suchfunktion `pub fn euclidean_distance(v1: &[f32], v2: &[f32]) -> f32`.
- **Formel:** $d(\mathbf{v1}, \mathbf{v2}) = \sqrt{\sum (v1_i - v2_i)^2}$
- **Denkanstoß:** In welchen Situationen ist die euklidische Distanz anfälliger für Fehler bei Texten unterschiedlicher Länge als die Kosinus-Ähnlichkeit?

---

### 🚴 Schwer: Vom Flat Index zum HNSW-Graph (Denkanstoß)
Deine aktuelle Implementierung vergleicht jede Anfrage mit **allen** Dokumenten im Speicher (ein sogenannter *Flat Index* mit Zeitkomplexität $\mathcal{O}(N \cdot D)$). Bei 1.000.000 Dokumenten wird das spürbar langsamer.
- **Forschungsauftrag:** Recherchiere das Konzept von **HNSW (Hierarchical Navigable Small World)** Graphen.
- **Leitfrage:** Wie funktioniert die Suche in einem solchen mehrschichtigen Graphen und welches Trade-off geht man zwischen Exaktheit (*Recall*) und Suchgeschwindigkeit ($\mathcal{O}(\log N)$) ein?

---

## 🎯 Zusammenfassung

Herzlichen Glückwunsch! Du hast das mathematische und architektonische Fundament für deine eigene Vektor-Datenbank gelegt:

- **Embeddings** wandeln semantische Bedeutung in hochdimensionale Koordinaten um.
- Die **Kosinus-Ähnlichkeit** misst die Ausrichtung von Vektoren unabhängig von ihrer Länge.
- Ein lokaler **In-Memory Vektor-Index** in Rust ist extrem speichereffizient, blitzschnell und wahrt die volle Kontrolle über deine Daten.

Mit diesem Baustein bist du bereit, dein RAG-Wissenssystem aus Kapitel 5 um eine echte semantische Suche zu erweitern!
