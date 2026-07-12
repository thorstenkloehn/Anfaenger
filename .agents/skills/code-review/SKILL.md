---
name: code-review
description: Überprüft Rust-Code im Projekt auf Qualität, Idiomatik und Rust-Konventionen.
---
# Code-Review
- Kriterien:
  1. Idiomatik (`match`, `if let`, `.unwrap_or()`, `Option`, `Result`).
  2. Ownership & Borrowing (keine unnötigen `.clone()`, korrekte Scopes/Referenzen).
  3. Format (`rustfmt`, `snake_case`).
- Regel: Keine fertigen Lösungen verraten! Nur didaktische Tipps, Pseudocode oder Compiler-Fehlererklärungen geben.
