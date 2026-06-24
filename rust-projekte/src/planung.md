# 📋 Projektplanung mit Antigravity `/planning`

*Bevor wir eine einzige Zeile Code schreiben – planen wir gemeinsam.*

---

Gute Projekte entstehen nicht aus dem Nichts. Sie entstehen aus einem **klaren Plan**. In dieser Lektion lernen wir, den interaktiven Planungs-Workflow von Antigravity zu nutzen, um unsere Rust-Projekte **Schritt für Schritt, Aufgabe für Aufgabe** durchzudenken – bevor der erste Code geschrieben wird.

> 🦀 **Das Prinzip:** Ein Plan ist kein Versprechen. Er ist ein **Kompass** – er zeigt die Richtung, auch wenn der Weg manchmal anders wird.

---

## 🧠 Theorie: Was ist `/planning` in Antigravity?

Der `/planning`-Befehl öffnet in Antigravity einen **interaktiven Planungseditor**. Anstatt einfach eine Aufgabe auszuführen, erstellt der Agent zuerst einen strukturierten **Schritt-für-Schritt-Plan** und wartet auf unsere Freigabe.

### Wie `/planning` funktioniert

```
Wir:    /planning Ich möchte das "Zahlen raten"-Projekt in Rust bauen.

Agent:  Hier ist mein Plan:

        [ ] Schritt 1: Zufallszahl mit rand-Crate generieren
        [ ] Schritt 2: Benutzereingabe lesen und als Zahl parsen
        [ ] Schritt 3: Vergleich und Feedback ("zu groß"/"zu klein")
        [ ] Schritt 4: Schleife bis zur richtigen Zahl
        [ ] Schritt 5: Versuchszähler und Abschlussmeldung

        Soll ich so vorgehen? (Bestätigen / Ändern / Abbrechen)
```

**Zeilenweise Dekonstruktion:**

- `/planning` – Der Befehl signalisiert: „Plane zuerst, handle dann."
- Der Agent listet alle Schritte als **Checkboxen** auf – jeder Schritt ist eine einzelne, erledigbare Aufgabe.
- Wir bestätigen, ändern oder brechen ab – **bevor** etwas passiert.
- Nach der Freigabe arbeitet der Agent Schritt für Schritt durch die Liste.

### Der Unterschied zu einer normalen Anfrage

| Normale Anfrage | Mit `/planning` |
|---|---|
| Agent handelt sofort | Agent plant zuerst |
| Wir sehen Ergebnisse, nicht den Weg | Wir sehen jeden Schritt vorher |
| Schwer rückgängig zu machen | Jeder Schritt einzeln kontrollierbar |
| Gut für kleine Aufgaben | Ideal für komplexere Projekte |

---

## 🛠️ Übung 1: Unser erstes `/planning` – „Zahlen raten"

**Ziel:** Den Planungs-Workflow für Projekt 1 aus Phase 1 erleben.

### Schritt 1: Antigravity CLI starten

```bash
agy
```

### Schritt 2: Den Planungs-Befehl eingeben

```
> /planning Ich möchte das Rust-Projekt "Zahlen raten" planen.
  
  Das Programm soll:
  - Eine Zufallszahl zwischen 1 und 100 wählen
  - Den Spieler so lange nach Zahlen fragen, bis er richtig liegt
  - "zu groß" oder "zu klein" ausgeben
  - Am Ende die Anzahl der Versuche zeigen
  
  Erstelle einen Plan mit Lernschritten – keinen fertigen Code.
```

### Schritt 3: Den Plan lesen und bewerten

Der Agent erstellt einen Plan. Bevor wir ihn bestätigen, fragen wir uns:
- Sind alle Schritte logisch geordnet?
- Fehlt ein Schritt?
- Ist ein Schritt zu groß (sollte aufgeteilt werden)?

### Schritt 4: Den Plan anpassen

```
> Füge zwischen Schritt 2 und 3 einen Schritt ein:
  "Fehlerbehandlung: Was passiert, wenn der Spieler keine Zahl eingibt?"
```

### Schritt 5: Den Plan freigeben

```
> Bestätigen
```

**Was jetzt passiert:** Der Agent beginnt, Schritt für Schritt durch die Liste zu gehen. Bei jedem Schritt sehen wir seinen Fortschritt.

> 🔍 **Nachdenk-Aufgabe:** Was hätte ohne den Planungsschritt gefehlt? Was wäre vielleicht direkt vergessen worden?

---

## 🛠️ Übung 2: Meilensteine setzen – `/planning` für größere Vorhaben

**Ziel:** Ein mehrteiliges Lernvorhaben in Meilensteine aufteilen.

Angenommen, wir wollen alle 10 Projekte der ersten Woche aus Phase 1 abschließen.

### Schritt 1: Den Meilenstein-Plan erstellen

```
> /planning Ich möchte in dieser Woche 5 Rust-Projekte aus Phase 1 abschließen.
  
  Meine verfügbare Zeit: 1 Stunde pro Tag (Montag bis Freitag)
  Mein aktueller Stand: Ich kenne Variablen und if/else, aber noch keine Schleifen.
  
  Erstelle einen Wochenplan mit:
  - Welches Projekt an welchem Tag
  - Welches Rust-Konzept ich dabei lerne
  - Eine konkrete Frage, die ich mir vor Beginn stellen soll
  
  Schreibe keinen Code – nur den Plan.
```

**Zeilenweise Dekonstruktion der Anfrage:**

- `Meine verfügbare Zeit:` – Der Agent kennt unsere Kapazitäten und plant realistisch.
- `Mein aktueller Stand:` – Er weiß, womit er anknüpfen kann.
- `Eine konkrete Frage vor Beginn` – Das ist das **Aktivierungs-Ritual**: Wir denken nach, bevor wir tippen.

### Schritt 2: Den Wochenplan als Datei speichern

```
> Speichere diesen Plan als wochenplan.md in meinem Rust-Projektordner.
```

**Was entsteht:**

```markdown
# Wochenplan – KW 26

## Montag: Projekt 1 – Zahlen raten
**Lerne:** loop, Benutzereingabe, Vergleich
**Frage vor Beginn:** Wie lese ich in Rust eine Zeile vom Terminal?

## Dienstag: Projekt 2 – Einkaufsliste  
**Lerne:** Vec, Ownership beim Hinzufügen
**Frage vor Beginn:** Was ist ein Vec und warum brauche ich ihn?

...
```

### Schritt 3: Den Plan täglich aktualisieren

```
> @wochenplan.md Ich habe heute Projekt 1 abgeschlossen. 
  Markiere Montag als erledigt und füge eine kurze Notiz hinzu:
  "Größte Herausforderung: .parse() mit Fehlerbehandlung."
```

> 🔍 **Nachdenk-Aufgabe:** Wie hilft ein schriftlicher Plan dabei, motiviert zu bleiben?

---

## 🛠️ Übung 3: Task-Listen führen – Fortschritt sichtbar machen

**Ziel:** Den Fortschritt eines einzelnen Projekts mit Checkboxen verwalten.

### Schritt 1: Task-Liste für ein Projekt anlegen

```
> /planning Erstelle eine detaillierte Task-Liste für Projekt 3 
  aus Phase 1 (Temperatur-Tagebuch).
  
  Jede Aufgabe soll:
  - Eine einzelne, abschließbare Aktion sein
  - Das Rust-Konzept benennen, das dabei geübt wird
  - Mit einem Lernziel verknüpft sein
  
  Format: Checkbox-Liste in Markdown
```

**Was der Agent erstellt:**

```markdown
# Temperatur-Tagebuch – Task-Liste

## Setup
- [ ] Neues Rust-Projekt anlegen: `cargo new temperatur-tagebuch`
- [ ] Verzeichnisstruktur verstehen (`src/main.rs`, `Cargo.toml`)

## Daten erfassen
- [ ] Variable für Temperaturen anlegen (Konzept: Vec<f64>)
- [ ] Eingabe-Schleife bauen (Konzept: loop)
- [ ] Benutzereingabe lesen (Konzept: stdin().read_line())
- [ ] Eingabe in f64 konvertieren (Konzept: .parse::<f64>())
- [ ] Beendigungsbedingung einbauen (Konzept: break)

## Auswertung
- [ ] Durchschnitt berechnen (Konzept: iter().sum(), len())
- [ ] Minimum finden (Konzept: iter().min())  
- [ ] Maximum finden (Konzept: iter().max())

## Ausgabe
- [ ] Ergebnisse formatiert ausgeben (Konzept: println! mit {:.1})

## Test
- [ ] Programm mit 5 Testwerten ausführen
- [ ] Fehlerfall testen: Was passiert bei Text-Eingabe?
```

### Schritt 2: Die Liste in Antigravity 2.0 öffnen

In Antigravity 2.0 → **Tasks** → die Datei als aktive Task-Liste einbinden.

### Schritt 3: Aufgaben beim Erledigen abhaken

```bash
agy
> @task-liste.md Ich habe gerade die Eingabe-Schleife fertig. 
  Markiere "Eingabe-Schleife bauen" als erledigt.
  Was ist der nächste logische Schritt?
```

**Zeilenweise Dekonstruktion:**

- `@task-liste.md` – Der Agent sieht die aktuelle Datei mit Fortschrittsstand.
- `Markiere ... als erledigt` – Der Agent setzt `[x]` statt `[ ]`.
- `Was ist der nächste logische Schritt?` – Wir fragen nicht nach dem Code, sondern nach dem nächsten **Konzept**.

> 🔍 **Nachdenk-Aufgabe:** Warum ist es motivierender, Checkboxen abzuhaken, als einfach Code zu schreiben?

---

## 🛠️ Übung 4: Planungs-Review – Was lief gut, was nicht?

**Ziel:** Nach einem abgeschlossenen Projekt den Plan rückwirkend bewerten.

### Schritt 1: Das Retrospektiv-Gespräch

```
> @task-liste.md Ich habe das Projekt abgeschlossen. 
  Führe mit mir eine kurze Retrospektive durch:
  
  1. Welche Aufgaben haben länger gedauert als erwartet?
  2. Welche Aufgabe war die lehrreichste?
  3. Was würde ich beim nächsten Projekt anders planen?
  
  Stelle mir diese Fragen eine nach der anderen – warte auf meine Antwort.
```

**Was passiert:** Der Agent führt ein strukturiertes Interview mit uns – eine Frage nach der anderen. Er wartet auf unsere Antwort, bevor er weitermacht.

### Schritt 2: Erkenntnisse in AGENTS.md übertragen

```
> Fasse meine Retrospektive in 3 Stichpunkten zusammen 
  und füge sie in AGENTS.md unter "Mein Lernstand" ein.
```

### Schritt 3: Den nächsten Plan informierter starten

Beim nächsten `/planning`-Aufruf kennt der Agent unsere Retrospektive – und plant realistischer.

> 🔍 **Nachdenk-Aufgabe:** Was ist der Unterschied zwischen einem Plan, der vor dem Projekt entsteht, und einer Retrospektive danach?

---

## 🛠️ Übung 5: Automatischer Planungs-Assistent in Antigravity 2.0

**Ziel:** Einen Scheduled Task einrichten, der uns jeden Montag beim Planen hilft.

### Schritt 1: Den Task erstellen

In Antigravity 2.0 → **Scheduled Tasks** → **New Task**:

```
Name:    Wöchentliche Projektplanung
Cron:    0 9 * * 1    (Jeden Montag um 09:00)
Aufgabe: Lies meine AGENTS.md.
         Führe einen /planning-Workflow für diese Woche durch:
         - Welche Projekte aus Phase 1 nehme ich mir vor?
         - Wie viel Zeit habe ich realistisch?
         - Was ist das Konzept, das ich diese Woche vertiefen möchte?
         
         Erstelle einen Wochenplan als wochenplan-[DATUM].md
         und lege ihn im Rust-Projektordner ab.
         Schreibe keinen Code.
```

### Schritt 2: Den ersten automatischen Plan abwarten

Am nächsten Montag um 09:00 Uhr erscheint eine Benachrichtigung. Der Agent hat bereits einen Wochenplan erstellt – wir müssen ihn nur noch bestätigen oder anpassen.

### Schritt 3: Den Plan als Lernritual etablieren

Montagmorgen → Plan lesen → anpassen → Woche starten.

---

## 📊 Das vollständige Planungs-System

Kombinieren wir alle Übungen zu einem **durchgehenden Planungs-Workflow**:

```
MONTAG 09:00
│
├─ 📋 /planning – Wochenplan erstellen
│   └─ wochenplan-[KW].md wird angelegt
│
├─ 🗒️ Task-Listen – Pro Projekt eine task-liste.md
│   └─ Checkboxen werden täglich aktualisiert
│
├─ 🔁 Täglich: Checkpoint
│   └─ "@task-liste.md Ich bin bei Aufgabe X. Was als Nächstes?"
│
└─ FREITAG 17:00
    └─ 🔍 Retrospektive: Was lief gut? Was würde ich ändern?
        └─ Erkenntnisse → AGENTS.md aktualisieren
```

### Die Planungs-Dateien im Überblick

```
mein-rust-projekt/
├── AGENTS.md                      ← Lernstand & Regeln
├── wochenplan-kw26.md             ← Wöchentlicher Überblick
├── temperatur-tagebuch-tasks.md   ← Task-Liste Projekt 3
├── zahlen-raten-tasks.md          ← Task-Liste Projekt 1
└── retrospektive-juni.md          ← Monatliche Rückschau
```

---

## 💡 Zusammenfassung

| Werkzeug | Befehl | Wann nutzen? |
|---|---|---|
| Planungs-Workflow | `/planning [Aufgabe]` | Vor jedem neuen Projekt |
| Task-Liste | `@task-liste.md` + Checkboxen | Während des Projekts |
| Wochenplan | Scheduled Task montags | Zu Beginn jeder Woche |
| Retrospektive | Nach Projektabschluss | Nach jedem Projekt |
| AGENTS.md Update | Nach Retrospektive | Wöchentlich |

> 🦀 **Merke:** Planung ist nicht das Gegenteil von Lernen – sie **ist** ein Teil des Lernens.  
> Wer plant, denkt schon über das Problem nach, bevor er es löst.  
> Und genau das macht einen guten Entwickler aus – egal ob Anfänger oder Profi.

---

## 📚 Weiterführende Links

| Ressource | Link |
|---|---|
| Antigravity /planning | [antigravity.google/docs](https://antigravity.google/docs) |
| Antigravity Scheduled Tasks | [antigravity.google/docs](https://antigravity.google/docs) |
| Rust Projektstruktur | [doc.rust-lang.org/book/ch01-03-hello-cargo.html](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html) |
