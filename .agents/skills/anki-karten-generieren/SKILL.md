---
name: anki-karten-generieren
description: Generiert Anki-Karten (Frage;Antwort) aus Buchkapiteln in /home/thorsten/Anfaenger/rust_anki_karten.csv.
---
# Skill: Anki-Karten generieren

Dieser Skill beschreibt, wie Anki-Lernkarten aus Buchkapiteln extrahiert und in der CSV-Datei gespeichert werden.

## 🛠️ Aktivierung
- **Trigger:** "Generiere Anki-Karten aus Kapitel [Name]", "Erstelle Karteikarten", "Anki-Lernkarten erstellen".

## 📋 Anforderungen & Format
- **Dateipfad:** `/home/thorsten/Anfaenger/rust_anki_karten.csv`
- **Format:** Jede Zeile muss genau dem Format `Frage;Antwort` entsprechen.
- **Wichtig:** Keine Semikolons (`;`) oder Zeilenumbrüche innerhalb der Frage oder Antwort verwenden!

## 🛡️ Regeln für Lernkarten
1. **Atomarität:** Jede Karte darf nur genau einen einfachen Fakt, eine Definition oder ein Konzept abfragen.
2. **Keine Codelösungen:** Schreibe keine kompletten Programmierlösungen auf Karten. Nutze stattdessen Fragen nach Konzepten oder kurzen Code-Snippets.
3. **Keine SUMMARY.md-Änderung:** Bei diesem Prozess darf `SUMMARY.md` nicht verändert werden.
