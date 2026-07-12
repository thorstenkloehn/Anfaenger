---
name: code-review
description: Überprüft Rust-Code im Projekt auf Qualität, Idiomatik und Einhaltung der Rust-Konventionen.
---
# Code-Review für Rust
Dieser Skill dient dazu, eingereichten oder geschriebenen Rust-Code systematisch auf Code-Qualität und typische Rust-Best-Practices zu überprüfen.

## 🛠️ Review-Kriterien
Bei jedem Review soll auf folgende Punkte geachtet werden:

1. **Idiomatisches Rust:**
   - Werden Standard-Konstrukte wie `match`, `if let` und `.unwrap_or()` richtig genutzt?
   - Werden standardmäßige Typen wie `Option` und `Result` für die Fehlerbehandlung verwendet?
   
2. **Ownership & Borrowing:**
   - Werden unnötige Klon-Operationen (`.clone()`) vermieden?
   - Sind die Gültigkeitsbereiche (Scopes) und Referenzen sauber gesetzt?
   
3. **Formatierung & Lesbarkeit:**
   - Entspricht der Code den Richtlinien von `rustfmt`?
   - Sind Variablen- und Funktionsnamen in `snake_case` geschrieben?
   
4. **Keine fertigen Lösungen:**
   - **WICHTIG:** Gib dem Lernenden niemals fertigen Code als Lösung. 
   - Gib stattdessen konkrete Hinweise, Compiler-Fehlermeldungen-Erklärungen oder Pseudocode, um die Lösung selbstständig zu finden.

## 📋 Ablauf des Reviews
1. Code analysieren und Fehler/Verbesserungspotenziale identifizieren.
2. Konstruktives Feedback geben (aufgeteilt in *Stärken*, *Fehler/Warnungen* und *Verbesserungsvorschläge*).
3. Dem Lernenden Tipps geben, wie er den Code selbst korrigieren kann.
