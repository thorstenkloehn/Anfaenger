---
name: anki-karten-generieren
description: Generiert atomare Anki-Karten (Frage;Antwort) phasenbasiert in /home/thorsten/Anfaenger/AnkiRust[1-10].csv.
---
# Skill: Anki-Karten
- **Aktivierung:** "Generiere Anki-Karten aus Kapitel [Name]", "Erstelle Karteikarten für Phase [X]".
- **Ziel-Dateien:** Phasenbasiert in `/home/thorsten/Anfaenger/AnkiRust[1-10].csv` (z. B. `AnkiRust1.csv` für Phase 1, `AnkiRust2.csv` für Phase 2).
- **Format:** Zeilenformat: `Frage;Antwort` (Keine zusätzlichen Semikolons oder Zeilenumbrüche im Fragetext oder in der Antwort!).
- **Regeln:**
  1. Atomar (genau 1 Fakt/Definition pro Karte).
  2. Keine kompletten Codelösungen.
  3. Strenge Einhaltung des CSV-Formats für den direkten Anki-Import.
  4. `SUMMARY.md` nicht verändern.
