# 🚀 Antigravity CLI (`agy`) – Dokumentation & Handbücher erstellen

*Wie du AGY nutzt, um vollautomatisiert umfassende READMEs, mdBooks und Nutzer-Handbücher zu schreiben und dabei gezielt Schwächen in deiner Software-Architektur aufzudecken.*

---

## 🧠 Theorie: "Alle wissen" für exzellente Handbücher

Ein KI-Agent liefert nur dann ein erstklassiges Handbuch, wenn er die tatsächliche Anwender-Perspektive versteht. Das Kontext-Wissen ("Alle wissen") muss daher strategisch über den reinen Quellcode hinausgehen:

* **Kontext aus Tests ableiten:** Deine Test-Dateien (z.B. im Ordner `tests/`) sind das perfekte "Alle wissen" für Anleitungen. Sie zeigen AGY präzise, wie deine Funktionen in der Praxis aufgerufen werden. Wenn AGY sich daran orientiert, generiert die KI realistische und vor allem garantiert kompilierbare Code-Beispiele für die Dokumentation.
* **Zielgruppen (Personas) steuern:** Ein System-Administrator braucht völlig andere Informationen als ein technisch unerfahrener Endnutzer. Du musst AGY im Prompt explizit mitteilen, für wen das Dokument gedacht ist.
* **Architektur-Check durch Doku:** Der ultimative Test für exzellenten Code ("auf bessere Lösungen kommen") ist die Dokumentation. Wenn AGY sich extrem schwertut, eine Konfigurationsdatei oder den Ablauf eines API-Features logisch und verständlich zu erklären, ist das Design oft mangelhaft und muss zwingend refactored werden.

## ⚙️ Einstellungen & Setup

Um lange, zusammenhängende Dokumente effektiv mit der AGY CLI zu generieren, solltest du folgende Werkzeuge nutzen:
* **Der Planungsmodus (`/planning`):** Ein komplettes mdBook mit 10 Kapiteln auf einmal zu schreiben, sprengt jeden Kontext und führt zu Halluzinationen. Nutze `/planning`, um AGY zuerst ein Inhaltsverzeichnis (SUMMARY) entwerfen zu lassen und die Erstellung der einzelnen Kapitel danach in isolierte, asynchrone Aufgaben (Tasks) zu unterteilen.
* **Modell-Wahl (`/model`):** Für kreatives, langes Schreiben von Handbüchern (Storytelling, roter Faden) empfiehlt es sich, über `/model` ein LLM zu wählen, das speziell auf lange Texte ("Long Context") optimiert ist.
* **Fokus setzen (`/clear` oder `/rewind`):** Reinige den Chat-Verlauf nach jedem fertigen Kapitel, damit die KI nicht verwirrt wird oder Formulierungen aus dem vorherigen Kapitel endlos wiederholt.

---

## 🛠️ Praxis-Übungen: Dokumentations-Workflows (reichlich!)

> [!IMPORTANT]
> **Erinnerung:** Hier gibt es keine fertigen Text-Vorlagen zum simplen Kopieren! Nutze die AGY CLI in einem deiner Rust-Projekte und erarbeite dir die Befehle und Prompts selbstständig.

### 🧭 Grundlagen: README und Code-Kommentare

#### Übung 1: Die smarte README.md
* **Aufgabe:** Bitte AGY direkt in der CLI: "Analysiere das aktuelle Projekt und generiere mir eine professionelle `README.md`. Sie muss eine kurze Projekt-Beschreibung, eine exakte Installations-Anleitung auf Basis meiner `Cargo.toml` und ein minimales Code-Beispiel enthalten."
* **Hinweis:** Prüfe, ob AGY die Datei direkt auf der Festplatte erstellt und speichert, anstatt den Text nur nutzlos im Chatfenster auszugeben.

#### Übung 2: Rustdoc im Bulk generieren
* **Aufgabe:** Du hast eine Rust-Datei mit mehreren unkommentierten Kern-Funktionen. Fordere AGY auf: "Füge über jeder öffentlichen Funktion in dieser Datei saubere Rustdoc-Kommentare (`///`) hinzu, inklusive eines `Examples` Abschnitts."
* **Hinweis:** Achte penibel darauf, dass AGY den ausführbaren Quellcode selbst nicht anfasst oder verändert. Kompiliere das Ergebnis zur Kontrolle sofort mit `cargo doc --open`.

#### Übung 3: Zielgruppen-Wechsel (Persona)
* **Aufgabe:** Lass AGY einen Guide schreiben, wie man deine Software installiert und ausführt. Einmal für einen extrem erfahrenen DevOps-Engineer und einmal für einen kompletten Laien.
* **Hinweis:** Vergleiche die Sprache der beiden Ergebnisse. Hat AGY für den Laien komplexe CLI-Befehle, Umgebungsvariablen und Docker-Pfade weggelassen und stattdessen absolute Grundlagen erklärt?

### 🛡️ Große Handbücher (mdBook) strukturieren

#### Übung 4: Die Buchstruktur planen (`/planning`)
* **Aufgabe:** Du willst ein umfassendes Nutzerhandbuch schreiben. Öffne den Planungsmodus (`/planning`). Beauftrage AGY: "Analysiere den Code und entwirf ein Inhaltsverzeichnis für ein mdBook. Lege im Planer für jedes Kapitel einen eigenen Task an."
* **Hinweis:** Nutze die Task-Übersicht, um kritisch zu prüfen, ob die Kapitelstruktur didaktisch logisch aufgebaut ist.

#### Übung 5: Kapitel isoliert schreiben
* **Aufgabe:** Lass AGY den ersten Task für Kapitel 1 ausführen.
* **Hinweis:** Wie stellst du sicher, dass AGY den aktiven Kontext nicht mit dem fertigen Text aus Kapitel 1 verstopft, bevor er Kapitel 2 beginnt? (Tipp: Setze auf Task-Isolation oder nutze `/clear` im Hauptchat).

#### Übung 6: Architektur visualisieren (Mermaid)
* **Aufgabe:** Bilder lockern Handbücher extrem auf. Bitte AGY: "Analysiere den Datenfluss in `main.rs` und generiere mir einen Mermaid.js Graphen (als reinen Code-Block), den ich direkt in mein Handbuch kopieren kann."
* **Hinweis:** Viele Markdown-Tools (wie auch mdBook Plugins) können Mermaid.js Code nativ rendern. Integriere den Code in dein Dokument und prüfe das visuelle Resultat.

### 🔄 Bessere Lösungen durch Dokumentation finden

#### Übung 7: Dokumentation streng aus Tests ableiten
* **Aufgabe:** Du hast eine komplexe Logik-Datei und die zugehörigen, funktionierenden Tests. Fordere AGY auf: "Schreibe ein Nutzer-Handbuch für dieses Modul, aber lies *ausschließlich* die Test-Dateien, um die Code-Beispiele für die Anleitung zu extrahieren."
* **Hinweis:** Tests sind die einzig verlässliche Dokumentation. AGY wird die `assert_eq!` Anweisungen nutzen, um absolut fehlerfreie Bedienungsanleitungen zu schreiben.

#### Übung 8: Automatische Übersetzung (I18n)
* **Aufgabe:** Deine generierte `README.md` ist auf Deutsch und fertig. Bitte AGY: "Erstelle eine inhaltlich exakte Kopie dieser Datei, übersetze sie in fließendes technisches Englisch und speichere sie als `README_en.md` ab."
* **Hinweis:** Zwinge den Agenten dazu, die Datei-Operationen (`write_file`) komplett selbst auszuführen, ohne dass du Texte manuell aus der CLI hin- und herkopieren musst.

#### Übung 9: Das Handbuch deckt Bad-Design auf
* **Aufgabe:** Der ultimative Architektur-Check! Beauftrage AGY: "Schreibe eine Endnutzer-Anleitung für das Befüllen meiner `config.rs`. Wenn dir dabei auffällt, dass Parameter unlogisch benannt, doppelt gemoppelt oder extrem schwer zu erklären sind, brich das Schreiben sofort ab und schlage mir ein besseres Architektur-Design (Refactoring) vor."
* **Hinweis:** Dies ist einer der mächtigsten KI-Workflows: Wenn AGY Probleme hat, ein Feature einfach zu beschreiben, ist das Feature zu 99% schlecht designt. So zwingst du die KI, auf "bessere Lösungen" zu kommen!
