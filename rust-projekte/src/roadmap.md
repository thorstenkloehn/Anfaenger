# Rust-Lernpfad Roadmap — Moderne Technik von 2026

Diese Roadmap ersetzt die alte Phasen-Einteilung. Sie ist in vier Level sortiert, vom Einstieg bis zum produktionsreifen Rust. Jedes Level hat eine eigene Seite mit Projektvorschlägen, die die jeweiligen Themen **kombiniert in echten Projekten** anwenden.

## 🟢 L1 Grundlagen (5 bis 10 Lektionen / 1 kleines CLI-Tool)
- Variablen, Datentypen, Kontrollfluss
- Benutzereingabe & String-Parsing
- Ownership, Borrowing & Lifetimes-Basics
- Structs, Enums, Methoden (z. B. Events, Severity Level)
- Pattern Matching (`match`, `if let`)
- Error Handling (`Option`, `Result`)
- `Vec`, `HashMap`, `String`
- Modulsystem (`mod`, `pub`, `use`, Sichtbarkeit)

→ [Zu den L1-Projektvorschlägen](./l1-grundlagen.md)

## 🟡 L2 Fortgeschritten (10 bis 15 Lektionen / 1 modularer Crate)
- Iteratoren & Closures (Filterung, Aggregationen)
- Testing (`#[test]`), `clippy`, `rustfmt`, `rustdoc`
- Generics, Traits & Typestate Pattern
- Trait Objects (`dyn Trait`) vs. statische Generics
- Cargo Workspaces & Modularisierung
- Smart Pointers (`Box`, `Rc`, `Arc`, `RefCell`)

→ [Zu den L2-Projektvorschlägen](./l2-fortgeschritten.md)

## 🟠 L3 Profi (15 bis 20 Lektionen / 1 vollständiges System)
- Error Handling (`thiserror`, `anyhow`)
- Config & Serialisierung (`serde`)
- CLI (`clap`)
- Tracing (`tracing`)
- Async/Await & Tokio Runtime
- Concurrency (`Arc<Mutex<T>>`, Channels)
- REST API (`axum`), DB (`sqlx`) & Docker
- Security-Grundlagen (Input-Validation, Secrets-Handling, `zeroize`)

→ [Zu den L3-Projektvorschlägen](./l3-profi.md)

## 🔴 L4 Experte
- Benchmarking (`criterion`) & Memory Profiling
- Property-based Testing & Fuzzing (`proptest`, `cargo-fuzz`)
- Zero-Copy, Unsafe Rust, FFI
- Custom Makros (`macro_rules!`, Derive-/Attribute-Makros)
- WebAssembly (`wasm-bindgen`)
- Crates.io Release & Production

→ [Zu den L4-Projektvorschlägen](./l4-experte.md)
