# 🚀 Antigravity CLI (`agy`) – Auf bessere Lösungen kommen

*Wie du AGY als Chef-Architekten und Sparringspartner nutzt, um schlechten Code umzuschreiben und geniale Software-Architekturen zu entwerfen.*

---

## 🧠 Theorie: "Alle wissen" bei der Lösungsfindung

Wenn du Code schreibst, der "nur irgendwie funktioniert", schöpfst du das Potenzial der Antigravity CLI nicht aus. Um wirklich brillante, performante und elegante Lösungen zu finden, musst du AGY aus der Rolle der reinen "Code-Schreib-Maschine" herausholen und ihn als Architektur-Berater einsetzen.

Damit der Agent bessere Lösungen findet, muss der Kontext ("Alle wissen") richtig gesetzt sein:
* **Das Ziel, nicht den Weg beschreiben:** Erkläre AGY ausführlich, *warum* der Code existiert, und nicht nur, *wie* er aktuell geschrieben ist. Nur wenn das große Ganze bekannt ist, kann der Agent dir vorschlagen, eine ineffiziente Schleife durch ein komplett anderes Design-Pattern zu ersetzen.
* **Gezielte Iteration:** Der allererste Lösungsansatz einer KI ist oft generisch oder naheliegend. Erst durch hartnäckiges Nachfragen ("Geht das speicherschonender?", "Wie würde ein Senior-Entwickler das abstrahieren?") kommst du auf das Top-Level.
* **Sicheres Experimentieren:** AGY bietet eingebaute Werkzeuge, um wilde Architektur-Ideen auszuprobieren und bei Misserfolg die Zeit einfach wieder zurückzudrehen.

## ⚙️ Einstellungen & Setup

Nutze die einzigartigen Features der AGY-CLI, um den Refactoring- und Lösungs-Prozess präzise zu steuern:
* **Modell wechseln (`/model`):** Für simples Autocomplete reicht ein schnelles, günstiges Modell. Für komplexe Architektur-Entscheidungen solltest du das Modell über die CLI auf die leistungsstärkste verfügbare Version hochschrauben.
* **Rückspulen (`/rewind` oder `/undo`):** Wenn ein aggressiver Refactoring-Versuch deinen Code zerschießt, kannst du die Konversation und den Datei-Status einfach auf einen früheren Checkpoint zurücksetzen.
* **Nebenbei-Fragen (`/btw`):** Perfekt, wenn du mitten in einem komplexen Gedankengang steckst und nur schnell eine Syntax-Frage hast, ohne den großen Architektur-Kontext zu verwässern.
* **Der Planungsmodus (`/planning`):** Bei riesigen Code-Umbauten hilft der interaktive Planungsmodus, die Architektur-Schritte vorher grafisch in Aufgaben (Tasks) zu unterteilen.

---

## 🛠️ Praxis-Übungen: Bessere Lösungen finden (reichlich!)

> [!IMPORTANT]
> **Erinnerung:** Hier gibt es keine vorgefertigten Code-Lösungen zum Kopieren! Nimm ein eigenes, lauffähiges Rust-Projekt, probiere die speziellen CLI-Befehle aus und trainiere deine Argumentationsfähigkeiten.

### 🧭 Brainstorming & Architektur

#### Übung 1: Die "3-Wege"-Architektur
* **Aufgabe:** Du brauchst ein neues Feature in deiner App (z.B. Datei-Caching). Lass AGY keinen Code schreiben, sondern fordere: "Skizziere mir 3 völlig verschiedene Ansätze für mein Caching-Problem mit Vor- und Nachteilen."
* **Hinweis:** Formuliere den Prompt so strikt, dass AGY wirklich nur konzeptionellen Text und Tabellen liefert, aber absolut keine Zeile Rust-Code generiert, bis du dich entschieden hast.

#### Übung 2: Nebenbei nachdenken (`/btw`)
* **Aufgabe:** Du diskutierst mit AGY tiefgreifend über dein neues Datenbank-Design. Dir fällt plötzlich ein, dass du nicht mehr weißt, wie das `serde` Crate für JSON-Listen funktioniert.
* **Hinweis:** Nutze den CLI-Befehl `/btw`, um die kurze JSON-Frage als "Side-Quest" zu stellen. Prüfe danach, ob AGY bei der nächsten normalen Eingabe den Fokus auf die ursprüngliche Datenbank-Diskussion behalten hat.

#### Übung 3: Das stärkste Gehirn nutzen
* **Aufgabe:** Du kommst bei einem komplizierten Rust-Lifetime-Fehler oder einem Architektur-Deadlock einfach nicht weiter. 
* **Hinweis:** Wie nutzt du den Befehl `/model` im Terminal, um temporär auf das intelligenteste (und teuerste) Modell zu wechseln, das dir in den AGY-Einstellungen zur Verfügung steht?

### 🛡️ Sicheres Refactoring

#### Übung 4: Schonungslose Code-Kritik
* **Aufgabe:** Übergib AGY eine deiner umfangreichsten Rust-Dateien und instruiere ihn: "Schlüpfe in die Rolle eines extrem kritischen Principal Engineers. Zerreiß meinen Code in der Luft, was Performance, Heap-Allokationen und Lesbarkeit angeht."
* **Hinweis:** Achte darauf, ob AGY ineffiziente `clone()`-Aufrufe, Memory-Leaks oder zu komplexe `match`-Blöcke aufdeckt, die du selbst übersehen hast.

#### Übung 5: Die Zeit zurückdrehen (`/rewind`)
* **Aufgabe:** Lass AGY eine Kern-Funktion probeweise völlig neu schreiben. Du merkst schnell, dass der neue Ansatz furchtbar ist und die Unit-Tests fehlschlagen. 
* **Hinweis:** Nutze den Befehl `/rewind` (oder `/undo`), um die Konversation und den modifizierten Code exakt auf den Zustand *vor* der schlechten Idee zurückspringen zu lassen.

#### Übung 6: Code-Diffs vor der Akzeptanz prüfen
* **Aufgabe:** AGY hat dein Refactoring durchgeführt. Bevor du weiterarbeitest, willst du genau sehen, welche Zeilen gelöscht und welche hinzugefügt wurden.
* **Hinweis:** Welcher Slash-Befehl (Tipp: `/diff`) zeigt dir die Änderungen direkt in der CLI-Ansicht an?

### 🔄 Komplexe Lösungs-Workflows

#### Übung 7: Der Planungsmodus
* **Aufgabe:** Du willst deine gesamte App von einer synchronen Architektur auf einen asynchronen Ansatz (z.B. mit `tokio`) umbauen. Ein riskanter und riesiger Schritt.
* **Hinweis:** Rufe `/planning` (falls in deinem Build verfügbar) auf. Lass AGY das große Refactoring vorab in kleine, logische Einzelschritte (Tasks) zerlegen, die ihr dann sicher nacheinander abarbeitet.

#### Übung 8: Fremden Code modernisieren
* **Aufgabe:** Such dir im Internet ein sehr altes, ungepflegtes Rust-Snippet. Bitte AGY in der CLI: "Modernisiere diesen Code auf die neueste Rust Edition und nutze idiomatische Standard-Bibliotheks-Features."
* **Hinweis:** Erkennt AGY alte Makros und ersetzt sie durch moderne Operatoren? Verbessert er das Error-Handling auf den neuesten Stand?

#### Übung 9: Testgetriebene Lösungsfindung
* **Aufgabe:** Du weißt noch nicht, wie der Algorithmus aussehen soll, aber du hast die fachlichen Unit-Tests (`#[test]`) als Anforderung bereits geschrieben. 
* **Hinweis:** Übergib AGY nur die leere Funktionssignatur und die fertigen Tests. Der Prompt lautet: "Denke schrittweise nach. Implementiere die Funktion exakt so, dass alle bereitgestellten Tests grün werden."
