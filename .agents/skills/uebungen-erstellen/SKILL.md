---
name: uebungen-erstellen
description: Erstellt Übungsaufgaben (Leicht, Mittel, Schwer) für Buchkapitel ohne Codelösungen.
---
# Skill: Übungen erstellen

Dieser Skill beschreibt den Ablauf zur Erstellung neuer Übungsaufgaben für Buchkapitel, aufgeteilt in drei Schwierigkeitsgrade.

## 🛠️ Aktivierung
- **Trigger:** "Erstelle Übungen zu Kapitel [Name]", "Füge Aufgaben hinzu", "Übungsaufgaben erstellen".

## 🛡️ Didaktische Kernregel
- **Keine fertigen Codelösungen präsentieren!** Die Aufgaben müssen so gestaltet sein, dass der Lernende den Code selbstständig schreiben muss.

## 📋 Übungsstruktur pro Kapitel
1. **Leicht:** Abfrage der Grundlagensyntax. Biete ein einfaches Code-Gerüst mit `todo!()` und einen einfachen Testfall (`assert_eq!`) an.
2. **Mittel:** Kombination mehrerer gelernter Konzepte. Biete eine Kriterienliste und entsprechende Testfälle an.
3. **Schwer:** Fortgeschrittene Anwendungsfälle (z. B. komplexe Ownership-Szenarien, Lifetimes, Traits). Biete eine API-Signatur und umfassende Test-Suiten an.

## ⚙️ Technische Regeln
- **Pfade:** Verwende bei Dateibeschreibungen oder Links immer absolute Pfade (z. B. `/home/thorsten/Anfaenger/rust-projekte/src/...`).
- **Keine SUMMARY.md-Änderung:** Bei diesem Prozess darf `SUMMARY.md` nicht verändert werden.
