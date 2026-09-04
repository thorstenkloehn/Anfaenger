# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

An mdBook-based German-language Rust learning book ("Rust-Lernpfad Roadmap") for beginners, deployed to `anfaenger.wissen-ahrensburg.de`. There is no Rust crate/application here to compile — the content itself is Markdown, built into a static site by mdBook. Content generation is agent-assisted (originally written for the "Antigravity" agent; `.agents/` and `AGENTS.md` reflect that history).

## Commands

```bash
# Live-reload dev server (http://localhost:3000)
cd rust-projekte && mdbook serve --open

# Build the book — run this after ANY change to src/ or SUMMARY.md to catch broken links/build errors
cd rust-projekte && mdbook build

# Deploy generated book/ to GitHub Pages (gh-pages branch)
cd rust-projekte && npm run ver
```

There is no test suite, linter, or CI for the book content — `mdbook build` succeeding is the only validation step. `.vscode/tasks.json` only contains a generic C/C++ gcc build task; it's unrelated to this project.

## Architecture

- `rust-projekte/book.toml` — mdBook config (title, `navy` theme, German `language = "de"`, extra JS injected via `additional-js`).
- `rust-projekte/src/SUMMARY.md` — the book's table of contents. mdBook only renders pages listed here; a new `.md` file in `src/` is invisible until added here.
- `rust-projekte/src/` content is organized by **level**, not by chapter-per-topic:
  - `roadmap.md` — overview/landing page linking to the four levels.
  - `l1-grundlagen.md` … `l4-experte.md` — one page per level (Grundlagen/Fortgeschritten/Profi/Experte), each holding a curriculum table plus 100+ numbered project ideas for that level, categorized by domain (Spiele, Verwaltungstools, Rechner, etc.).
  - `Impressum.md`, `Datenschutz.md` — legal pages (German legal requirements: Impressum + Datenschutz/DDG).
- `rust-projekte/book/` — generated output, git-ignored, never edit directly.
- `rust-projekte/ki-hinweis.js` — injected via `additional-js`; auto-inserts an AI-transparency disclaimer paragraph (EU AI Act Art. 50) at the top and bottom of every page's `<main>` content. Don't hand-add this disclaimer to Markdown source — it's injected client-side.
- `rust-projekte/mermaid.min.js` / `mermaid-init.js` — enable Mermaid diagrams in chapters via ` ```mermaid ` code fences.
- `.agents/skills/*/SKILL.md` — task-specific instruction sets (new chapter, exercises, code review, error explanation, editing, Anki cards, subagent orchestration) written for the Antigravity agent. Their rules (below) still describe how content in this repo should be produced.

## Content rules (from AGENTS.md / .cursorrules)

These apply to any Markdown content added or edited in `rust-projekte/src/`:

- **Language & tone:** German, friendly informal "Du" form. Explain concepts with analogies before syntax.
- **Never give finished code solutions** for exercises or compiler errors. Use `todo!()` skeletons, pseudocode/concept sketches, or guiding questions instead — the learner must write the code.
- **SUMMARY.md is manual and load-bearing:** any new chapter file must be added by hand as `- [EMOJI Titel](./[name-kebab].md)`, or mdBook won't include it.
- **Always run `mdbook build`** in `rust-projekte/` after editing book structure or content to verify it builds cleanly.
- **Anki cards:** phase-based files `AnkiRust1.csv` … `AnkiRust10.csv` in the repo root, format `Frage;Antwort`, one atomic fact per line, no extra semicolons/newlines in the text.
- Ignore/never read into context: `rust-projekte/book/`, `rust-projekte/node_modules/`, `*.o`, `*.out`.
