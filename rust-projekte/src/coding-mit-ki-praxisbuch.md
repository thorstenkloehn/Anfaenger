# Coding mit KI – Sortiert nach Lernphasen

Dieses Kapitel ordnet die Themen, Konzepte und Praxisprojekte aus führenden nationalen und internationalen Standardwerken (Auflagen 2025/2026) der KI-gestützten Softwareentwicklung den didaktischen Phasen unseres Kurses zu.

### 📚 Einbezogene Bücher:
1. **„Coding mit KI – Das Praxisbuch für die Softwareentwicklung“** (2. Auflage, 2026) von Michael Kofler, Bernd Öggl und Sebastian Springer (Rheinwerk)
2. **„Vibe Coding professionell / Beyond Vibe Coding“** (2026) von Addy Osmani (O'Reilly)
3. **„Programmieren mit KI – KI-Tools für alle Phasen der Codeerstellung nutzen“** von Tom Taulli (O'Reilly)
4. **„Vibe Coding: Building Production-Grade Software with GenAI, Chat, Agents, and Beyond“** (2025/2026) von Gene Kim und Steve Yegge (IT Revolution)
5. **„Vibe Engineering: Best Practices, Mistakes, and Tradeoffs“** (2026) von Tomasz Lelek und Artur Skowroński (Manning)
6. **„AI-Assisted Coding: A Practical Guide for Software Engineers“** (2026) von Durgesh Rajubhai Pawar (Master.dev)

---

## 🗺️ Phasen-Inhaltsverzeichnis

### Phase 1: Grundlagen für Einsteiger (Erste Schritte, Prompting & Tools)
* **Evolution & KI-Grundlagen**
  * Evolution der Softwareentwicklung: Vom Compiler zur generativen KI *(Taulli, Kap. 1)*
  * Funktionsweise von KI-Coding: Codevorschläge vs. klassische Code-Vervollständigung *(Taulli, Kap. 2)*
  * Grundlagen von Large Language Models (LLMs): Token-Management und Kontextfenster *(Kofler, Kap. 1)*
  * Die probabilistische Engine: Grundlagen und das Abstraktionsproblem *(Pawar, Teil 1)*
  * Das mentale Modell für Vibe Engineering *(Lelek & Skowroński)*
* **Der Paradigmenwechsel**
  * Die FAAFO-Philosophie (Fast, Ambitious, Autonomous, Fun, Optionality) *(Kim & Yegge, Teil 1)*
  * Vom Linienkoch zum Küchenchef: Der Wandel vom manuellen Code-Schreiber zum System-Orchestrator *(Kim & Yegge, Teil 2; Osmani)*
* **Prompt Engineering & Tool-Setup**
  * Grundlagen des Promptings: Zero-Shot, Few-Shot und Chain-of-Thought *(Kofler, Kap. 1)*
  * Anatomie eines Prompts: Anweisungen, Kontext, Eingabedaten und Ausgabeformate *(Taulli, Kap. 3)*
  * Einrichtung von GitHub Copilot und Alternativen (Tabnine, Amazon Q Developer, Gemini Code Assist, Cody, Warp) *(Taulli, Kap. 4 & 5)*
  * Schnelles Prototyping im Browser mit stackblitz Bolt.new *(Osmani: Vibe Coding mit Bolt)*
* **Pair Programming zum Lernen**
  * Den passenden KI-Lernpartner auswählen und didaktisch nutzen *(Kofler, Kap. 2)*
  * Code-Gerüste erstellen und in einfache Funktionen strukturieren *(Kofler, Kap. 2)*
  * Praxisbeispiel: IBAN-Validierung schrittweise umsetzen *(Kofler, Kap. 2)*
  * Praxisbeispiel: Ein einfaches Text-Quiz entwickeln *(Kofler, Kap. 2)*
  * Inline-Dokumentation und verständliche Docstrings generieren lassen *(Kofler, Kap. 7)*

---

### Phase 2: Eigene Datentypen (Objektorientierung & Refactoring-Einstieg)
* **Strukturierter Codeentwurf**
  * Objektorientiertes und strukturiertes Design mit KI planen *(Kofler, Kap. 2)*
  * Fortgeschrittenes Prompt-Engineering: *Contract-First* und *Explain-Then-Implement* *(Pawar, Teil 1)*
  * Kontext-Management: Session-Architekturen optimal steuern *(Pawar, Teil 1)*
  * Praxisprojekt: Ein modulares Sudoku-Spielfeld planen und entwerfen *(Kofler, Kap. 2)*
* **Erstes Refactoring**
  * Code lesbarer schreiben (Bezeichner verbessern, Magic Numbers eliminieren) *(Kofler, Kap. 5)*
  * Code Smells mithilfe der KI erkennen und beheben *(Kofler, Kap. 5)*

---

### Phase 3: Fehlerbehandlung & Collections (Debugging & Testen)
* **Didaktisches Debugging**
  * Compiler-Fehlermeldungen richtig interpretieren und beheben lassen *(Kofler, Kap. 4)*
  * Debugging-Workflows in Visual Studio Code und Visual Studio *(Kofler, Kap. 4; Taulli)*
  * Fehlerbehandlung: Strategien für robuste Fehlerbehandlung (`Result` und `Option` richtig einsetzen) *(Kofler)*
* **Das kumulative Fehlerproblem (Compound Error)**
  * Wie Fehler in KI-generiertem Code sich aufschaukeln und wie man sie behebt *(Pawar, Teil 1)*
* **Software testen & validieren**
  * Die KI als QA-Partner: Testabdeckung und Edge-Cases ermitteln *(Pawar, Teil 1; Kim & Yegge, Teil 3)*
  * Synthetische Testdaten für Listen, Vektoren und Key-Value-Speicher generieren *(Kofler, Kap. 6)*
  * Unit-Tests und Integrationstests automatisch erstellen lassen *(Kofler, Kap. 6)*
  * Test-Driven Development (TDD) mit KI-Unterstützung ausprobieren *(Kofler, Kap. 6)*
  * KI-gestützte Evaluierung und Validierung von Code *(Lelek & Skowroński)*

---

### Phase 4: Module, Pfade, Packages & Crates (Multi-File & Integration)
* **Multi-File-Entwicklung**
  * Codebasen über Prompts auf mehrere Dateien und Module aufteilen *(Kofler, Kap. 2)*
  * Importe und Sichtbarkeiten organisieren
* **Modernisierung von Code**
  * Modernisierung von Legacy-Applikationen mit KI *(Lelek & Skowroński)*
* **Sicherheitsrisiken im Dependency-Management**
  * Package-Halluzinationen: Risiken durch fiktive Bibliotheken erkennen *(Pawar, Teil 1)*
  * API-Dokumentation für externe Abhängigkeiten generieren *(Kofler, Kap. 7)*

---

### Phase 5: Generics, Traits & Lifetimes (Schnittstellen & Compiler-Hilfe)
* **Schnittstellendesign**
  * Generische Typen und Traits mit KI entwerfen *(Kofler)*
  * Entwerfen von stabilen Verträgen (Contract-First) für generische APIs *(Pawar, Teil 1)*
* **Komplexe Compiler-Kämpfe**
  * Lebensdauern (Lifetimes) und Speicherregeln mithilfe von KI-Erklärungen verstehen und lösen

---

### Phase 6: Smart Pointer & Speicherverwaltung (Lokale LLMs & Sicherheit)
* **Lokale Ausführung von Modellen (Datenschutz)**
  * Warum lokale LLMs? (Sicherheit für Firmen-Codebasen) *(Kofler, Kap. 8)*
  * Server-Setup für lokale Modelle (Ollama, LM Studio) *(Kofler, Kap. 8)*
  * Docker Model Runner und Llama.cpp verwenden *(Kofler, Kap. 8)*
* **Sicherheitsrisiken**
  * Absicherung von sensitivem Code bei der Arbeit mit LLMs (Prompt Injection) *(Pawar, Teil 1)*
  * Speicherverwaltung und Heap-Allokationen (Box, Rc, Arc) optimieren *(Kofler, Kap. 5)*

---

### Phase 7: Fearless Concurrency (Asynchronität & Deployment)
* **Asynchrone Workflows**
  * Asynchronen Code entwerfen (Tokio-Integration) *(Kofler)*
  * Debugging von komplexen Race Conditions, Deadlocks und Threads *(Kofler, Kap. 4)*
* **Deployment & CI/CD**
  * KI-gestützte Bereitstellung und Deployment-Pipelines vorbereiten *(Taulli)*
  * Erstellen von automatisierten Tests für nebenläufigen Code *(Kofler, Kap. 6)*

---

### Phase 8: Idiomatisches Programmieren (Iteratoren & Closures)
* **Fortgeschrittenes Refactoring**
  * Imperative Schleifen in funktionale, idiomatische Iterator-Ketten übersetzen *(Kofler, Kap. 5)*
  * Closures und Lambda-Ausdrücke optimieren *(Kofler, Kap. 5)*
* **Automatisierung repetitiver Aufgaben**
  * Generierung komplexer regulärer Ausdrücke (RegEx) und Texttransformationen *(Taulli)*

---

### Phase 9: Systemprogrammierung (APIs, RAG & Risikomanagement)
* **Eigene KI-Werkzeuge bauen**
  * Nutzung von LLM-APIs in eigenen Anwendungen (Python, Rust, Node.js) *(Kofler, Kap. 9)*
  * Retrieval-Augmented Generation (RAG) für lokale Wissensdatenbanken *(Kofler, Kap. 9)*
  * SQL-to-Text und automatisierte Datenbankabfragen *(Kofler, Kap. 9)*
* **Enterprise-Skalierung & Risikomanagement**
  * Skalierung von AI-Agents in großen Infrastrukturen *(Kim & Yegge, Teil 4)*
  * Governance, Urheberrechtsschutz und Open-Source-Compliance *(Kofler, Kap. 10; Taulli)*
  * Risiko-Management: Halluzinationen in sicherheitskritischem Code vermeiden *(Taulli, Kap. 3; Osmani)*

---

### Phase 10: Metaprogrammierung (Agentic Coding, MCP & Bolt.new)
* **Das „70%-Problem“ & Agentic Coding**
  * Das „70%-Problem“: Warum 30% der Softwareentwicklung menschliche Architektur-Expertise erfordern *(Osmani: Beyond Vibe Coding)*
  * Einführung in das Agentic-Coding-Paradigma (Autonome Agenten vs. passive Assistenten) *(Taulli, Kap. 3; Kofler, Kap. 3)*
  * Agentic Coding Best Practices und autonome Workflows *(Lelek & Skowroński)*
  * Autonomes Arbeiten im Terminal (Claude Code, Antigravity CLI) *(Kofler, Kap. 3)*
  * Agentic Coding mit Cursor (Composer, Multi-File-Edit) *(Kofler, Kap. 3)*
  * Komplexe Web-Apps planen, entwickeln und betreiben mit stackblitz Bolt.new *(Osmani: Vibe Coding mit Bolt)*
* **Erweiterbarkeit & Customizing**
  * Model Context Protocol (MCP): Server einrichten und nutzen *(Kofler, Kap. 9)*
  * Eigene Tools, MCP-Server und Custom Skills entwickeln *(Kofler, Kap. 9)*
  * Makro-Generierung und Code-Erweiterungen mit KI
  * Teambildung und funktionsübergreifende Zusammenarbeit in der KI-Ära *(Lelek & Skowroński)*
