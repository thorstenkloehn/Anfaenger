---
name: code-review
description: Überprüft Rust-Code im Projekt auf Qualität, Idiomatik und Rust-Konventionen.
---
# Skill: Code-Review

Dieser Skill wird angewendet, um geschriebenen Rust-Code des Lernenden auf Qualität, Idiomatik und Rust-Konventionen zu prüfen.

## 🛠️ Aktivierung
- **Trigger:** "Reviewe meinen Code", "Prüfe diesen Code", "Ist dieser Rust-Code idiomatisch?".

## 📋 Review-Kriterien
1. **Idiomatik:** Werden Konstrukte wie `match`, `if let`, `.unwrap_or()`, `Option` und `Result` sinnvoll eingesetzt?
2. **Ownership & Borrowing:** Gibt es unnötige Kopien/Klone (`.clone()`)? Sind Referenzen und Scopes optimal gesetzt?
3. **Formatierung:** Entspricht der Code dem Standard (`rustfmt`, `snake_case` für Variablen/Funktionen)?

## 🛡️ Didaktische Regel
- **Keine fertigen Lösungen!** Verrate dem Benutzer niemals die fertige Codelösung.
- Gib stattdessen didaktische Tipps, stelle Leitfragen, zeige abstrakten Pseudocode oder verweise auf relevante Compiler-Fehlermeldungen.
