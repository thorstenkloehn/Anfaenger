// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="einleitung.html">Einleitung</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="modernes-programmieren-ki.html"><strong aria-hidden="true">1.</strong> 🤖 Einführung: Modernes Programmieren mit KI</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="setup.html"><strong aria-hidden="true">2.</strong> 🛠️ System-Setup</a></span></li><li class="chapter-item expanded "><li class="part-title">🗺️ Projektplanung</li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="planung.html"><strong aria-hidden="true">3.</strong> Planung mit Antigravity /planning</a></span></li><li class="chapter-item expanded "><li class="part-title">Phase 1: Grundlagen für Einsteiger</li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="uebersetzung-vergleich.html"><strong aria-hidden="true">4.</strong> Die Übersetzungsphasen: C, C++ und Rust im Vergleich</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="compiler-strenge.html"><strong aria-hidden="true">5.</strong> 🛠️ Strenge Compiler: C/C++ wie Rust &amp; OCaml einstellen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="rust-compiler-pipeline.html"><strong aria-hidden="true">6.</strong> ⚙️ Die Rust-Compiler-Pipeline: Von Code zu LLVM</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase1-konzepte.html"><strong aria-hidden="true">7.</strong> Konzepte statt Syntax lernen</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-variablen.html"><strong aria-hidden="true">7.1.</strong> Variablen &amp; Datentypen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-kontrollfluss.html"><strong aria-hidden="true">7.2.</strong> Kontrollfluss</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-eingabe.html"><strong aria-hidden="true">7.3.</strong> Benutzereingabe</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-ownership.html"><strong aria-hidden="true">7.4.</strong> Ownership &amp; Borrowing</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-string.html"><strong aria-hidden="true">7.5.</strong> String vs &amp;str</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="coding-mit-ki-phase1-konzepte.html"><strong aria-hidden="true">8.</strong> 🤖 Konzepte statt Syntax lernen (Coding mit KI - Phase 1)</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="coding-mit-ki-phase1-workshop.html"><strong aria-hidden="true">8.1.</strong> 🛹 Mitmach-Workshop: Coding mit KI – Phase 1 bildhaft verstehen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="coding-mit-ki-phase1.html"><strong aria-hidden="true">8.2.</strong> 💡 Projektvorschläge: Coding mit KI (Phase 1)</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase1-workshop.html"><strong aria-hidden="true">9.</strong> 🛹 Mitmach-Workshop: Phase 1 bildhaft verstehen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase1.html"><strong aria-hidden="true">10.</strong> Projektvorschläge Phase 1</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="100-projekte.html"><strong aria-hidden="true">11.</strong> 100 Projekte</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="100-projekte-prompts.html"><strong aria-hidden="true">12.</strong> 100 Projekte – Nur Prompts (Modulares Prinzip)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="100-projekte-workflows.html"><strong aria-hidden="true">13.</strong> 100 Projekte – Modulare Workflows (Phase 1)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="anki.html"><strong aria-hidden="true">14.</strong> 📇 Anki-Lernkarten</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="c-phase1-konzepte.html"><strong aria-hidden="true">15.</strong> 🇨 C-Programmierung (Grundkurs C) - Phase 1</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="c-phase1-workshop.html"><strong aria-hidden="true">15.1.</strong> 🛹 Mitmach-Workshop</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="c-phase1.html"><strong aria-hidden="true">15.2.</strong> Projektvorschläge Phase 1</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="c-kapitel01.html"><strong aria-hidden="true">15.3.</strong> 1 Der Einstieg in die Welt von C</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="c-kapitel02.html"><strong aria-hidden="true">15.4.</strong> 2 Erste Schritte in C</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="c-kapitel03.html"><strong aria-hidden="true">15.5.</strong> 3 Basisdatentypen in C</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="c-kapitel04.html"><strong aria-hidden="true">15.6.</strong> 4 Rechnen mit C und Operatoren</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="c-kapitel05.html"><strong aria-hidden="true">15.7.</strong> 5 Bedingte Anweisungen und Verzweigungen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="c-kapitel06.html"><strong aria-hidden="true">15.8.</strong> 6 Schleifen – Programmteile wiederholen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="c-kapitel07.html"><strong aria-hidden="true">15.9.</strong> 7 Funktionen erstellen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="c-kapitel08.html"><strong aria-hidden="true">15.10.</strong> 8 Präprozessor-Direktiven</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="c-kapitel09.html"><strong aria-hidden="true">15.11.</strong> 9 Arrays und Zeichenketten (Strings)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="c-kapitel14.html"><strong aria-hidden="true">15.12.</strong> 14 Eingabe- und Ausgabefunktionen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="c-kapitel15.html"><strong aria-hidden="true">15.13.</strong> 15 Zeitroutinen (time.h)</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="cpp-phase1-konzepte.html"><strong aria-hidden="true">16.</strong> 🚀 C++-Programmierung (Grundkurs C++23) - Phase 1</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="cpp-phase1-workshop.html"><strong aria-hidden="true">16.1.</strong> 🛹 Mitmach-Workshop</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="cpp-phase1.html"><strong aria-hidden="true">16.2.</strong> Projektvorschläge Phase 1</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="cpp-kapitel01.html"><strong aria-hidden="true">16.3.</strong> 1 Einstieg in die Welt von C++</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="cpp-kapitel02.html"><strong aria-hidden="true">16.4.</strong> 2 Erste Schritte in C++</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="cpp-kapitel03.html"><strong aria-hidden="true">16.5.</strong> 3 Die eingebauten C++-Basisdatentypen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="cpp-kapitel04.html"><strong aria-hidden="true">16.6.</strong> 4 Arbeiten mit den eingebauten Typen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="cpp-kapitel05.html"><strong aria-hidden="true">16.7.</strong> 5 Kontrollstrukturen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="cpp-kapitel06.html"><strong aria-hidden="true">16.8.</strong> 6 Arrays und Strings</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="cpp-kapitel08.html"><strong aria-hidden="true">16.9.</strong> 8 Funktionen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="cpp-kapitel09.html"><strong aria-hidden="true">16.10.</strong> 9 Modularisierung und Präprozessor</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="cpp-kapitel17.html"><strong aria-hidden="true">16.11.</strong> 17 Ein-/Ausgabestreams für Dateien</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="kotlin-phase1-konzepte.html"><strong aria-hidden="true">17.</strong> 🅺 Kotlin-Programmierung (Grundkurs Kotlin) - Phase 1</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="rust-und-kotlin-gleichzeitig-lernen.html"><strong aria-hidden="true">17.1.</strong> 🦀⚡ Rust &amp; Kotlin gleichzeitig lernen: Das Synergie-Handbuch</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="kotlin-phase1-workshop.html"><strong aria-hidden="true">17.2.</strong> 🛹 Mitmach-Workshop</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="kotlin-phase1.html"><strong aria-hidden="true">17.3.</strong> Projektvorschläge Phase 1</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="kotlin-kapitel01.html"><strong aria-hidden="true">17.4.</strong> 1 Einstieg in die Welt von Kotlin</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="kotlin-kapitel02.html"><strong aria-hidden="true">17.5.</strong> 2 Variablen, Datentypen &amp; Null-Safety in Kotlin</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="kotlin-kapitel03.html"><strong aria-hidden="true">17.6.</strong> 3 Kontrollstrukturen &amp; Funktionen in Kotlin</a></span></li></ol><li class="chapter-item expanded "><li class="part-title">Phase 2: Eigene Datentypen (Structs &amp; Enums)</li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase2-konzepte.html"><strong aria-hidden="true">18.</strong> Konzepte statt Syntax lernen</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-structs.html"><strong aria-hidden="true">18.1.</strong> Structs &amp; Methoden</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-enums.html"><strong aria-hidden="true">18.2.</strong> Enums</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-matching.html"><strong aria-hidden="true">18.3.</strong> Pattern Matching</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase2-workshop.html"><strong aria-hidden="true">19.</strong> 🧱 Mitmach-Workshop: Phase 2 bildhaft verstehen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase2.html"><strong aria-hidden="true">20.</strong> Projektvorschläge Phase 2</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="100-projekte-phase2.html"><strong aria-hidden="true">21.</strong> 100 Projekte - Themen anzeigen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="100-projekte-prompts-phase2.html"><strong aria-hidden="true">22.</strong> 100 Projekte – Nur Prompts (Modulares Prinzip)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="bash-grundlagen.html"><strong aria-hidden="true">23.</strong> 🐚 Bash-Skripte – Grundlagen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="bash-theorie-komplett.html"><strong aria-hidden="true">24.</strong> 🐚 Bash-Theorie: Alle Themen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="bash-projektvorschlaege.html"><strong aria-hidden="true">25.</strong> Bash-Projektvorschläge</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="c-kapitel12.html"><strong aria-hidden="true">26.</strong> 12 Komplexe Datentypen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="cpp-kapitel10.html"><strong aria-hidden="true">27.</strong> 10 Strukturen, Aufzählungen und dynamische Speicherobjekte</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="cpp-kapitel11.html"><strong aria-hidden="true">27.1.</strong> 11 Klassen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="cpp-kapitel12.html"><strong aria-hidden="true">27.2.</strong> 12 Objekte und Klassenelemente</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="cpp-kapitel13.html"><strong aria-hidden="true">27.3.</strong> 13 Operatoren überladen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="cpp-kapitel14.html"><strong aria-hidden="true">27.4.</strong> 14 Vererbung (Abgeleitete Klassen)</a></span></li></ol><li class="chapter-item expanded "><li class="part-title">Phase 3: Fehlerbehandlung &amp; Collections</li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase3-konzepte.html"><strong aria-hidden="true">28.</strong> Konzepte statt Syntax lernen</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-vectors.html"><strong aria-hidden="true">28.1.</strong> Vektoren &amp; Listen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-hashmaps.html"><strong aria-hidden="true">28.2.</strong> HashMaps</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-option.html"><strong aria-hidden="true">28.3.</strong> Option</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-result.html"><strong aria-hidden="true">28.4.</strong> Result</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-panic.html"><strong aria-hidden="true">28.5.</strong> Unwiederherstellbare Fehler (panic!)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="rust-testing-benchmarking.html"><strong aria-hidden="true">28.6.</strong> 🧪 Testen, Dokumentation &amp; Benchmarking</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase3-workshop.html"><strong aria-hidden="true">29.</strong> 🛒 Mitmach-Workshop: Phase 3 bildhaft verstehen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase3.html"><strong aria-hidden="true">30.</strong> Projektvorschläge Phase 3</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="100-projekte-phase3.html"><strong aria-hidden="true">31.</strong> 100 Projekte - Fehlerbehandlung &amp; Collections</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="100-projekte-prompts-phase3.html"><strong aria-hidden="true">32.</strong> 100 Projekte – Nur Prompts (Modulares Prinzip)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="cpp-kapitel16.html"><strong aria-hidden="true">33.</strong> 16 Ausnahmebehandlung (Fehlerbehandlung)</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="cpp-kapitel18.html"><strong aria-hidden="true">33.1.</strong> 18 Die Standardbibliothek und weitere Sprachelemente</a></span></li></ol><li class="chapter-item expanded "><li class="part-title">Phase 4: Module, Pfade, Packages &amp; Crates</li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase4-konzepte.html"><strong aria-hidden="true">34.</strong> Konzepte statt Syntax lernen</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-crates.html"><strong aria-hidden="true">34.1.</strong> Packages, Crates &amp; Cargo</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-module.html"><strong aria-hidden="true">34.2.</strong> Module &amp; Sichtbarkeit</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-pfade.html"><strong aria-hidden="true">34.3.</strong> Pfade &amp; Importe</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="cargo-workspaces-features.html"><strong aria-hidden="true">34.4.</strong> 📦 Cargo Workspaces, Features &amp; Performance-Profile</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase4-workshop.html"><strong aria-hidden="true">35.</strong> 📦 Mitmach-Workshop: Phase 4 bildhaft verstehen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase4.html"><strong aria-hidden="true">36.</strong> Projektvorschläge Phase 4</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="100-projekte-phase4.html"><strong aria-hidden="true">37.</strong> 100 Projekte - Module, Pfade, Packages &amp; Crates</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="100-projekte-prompts-phase4.html"><strong aria-hidden="true">38.</strong> 100 Projekte – Nur Prompts (Modulares Prinzip)</a></span></li><li class="chapter-item expanded "><li class="part-title">Phase 5: Generics, Traits &amp; Lifetimes</li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase5-konzepte.html"><strong aria-hidden="true">39.</strong> Konzepte statt Syntax lernen</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-generics.html"><strong aria-hidden="true">39.1.</strong> Generics &amp; Generische Typen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-traits.html"><strong aria-hidden="true">39.2.</strong> Traits &amp; Schnittstellen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-lifetimes.html"><strong aria-hidden="true">39.3.</strong> Lifetimes &amp; Lebensdauern</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase5-workshop.html"><strong aria-hidden="true">40.</strong> 📦 Mitmach-Workshop: Phase 5 bildhaft verstehen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase5.html"><strong aria-hidden="true">41.</strong> Projektvorschläge Phase 5</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="100-projekte-phase5.html"><strong aria-hidden="true">42.</strong> 100 Projekte - Generics, Traits &amp; Lifetimes</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="100-projekte-prompts-phase5.html"><strong aria-hidden="true">43.</strong> 100 Projekte – Nur Prompts (Modulares Prinzip)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="cpp-kapitel15.html"><strong aria-hidden="true">44.</strong> 15 Templates</a></span></li><li class="chapter-item expanded "><li class="part-title">Phase 6: Smart Pointer &amp; Speicherverwaltung</li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase6-konzepte.html"><strong aria-hidden="true">45.</strong> Konzepte statt Syntax lernen</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-box.html"><strong aria-hidden="true">45.1.</strong> Box&lt;T&gt; &amp; Heap-Allokation</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-rc-arc.html"><strong aria-hidden="true">45.2.</strong> Rc&lt;T&gt; &amp; Arc&lt;T&gt; (Geteilter Besitz)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-refcell.html"><strong aria-hidden="true">45.3.</strong> RefCell&lt;T&gt; (Interior Mutability)</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase6-workshop.html"><strong aria-hidden="true">46.</strong> 📦 Mitmach-Workshop: Phase 6 bildhaft verstehen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase6.html"><strong aria-hidden="true">47.</strong> Projektvorschläge Phase 6</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="100-projekte-phase6.html"><strong aria-hidden="true">48.</strong> 100 Projekte - Smart Pointer &amp; Speicherverwaltung</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="100-projekte-prompts-phase6.html"><strong aria-hidden="true">49.</strong> 100 Projekte – Nur Prompts (Modulares Prinzip)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="c-kapitel11.html"><strong aria-hidden="true">50.</strong> 11 Dynamische Speicherverwaltung</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="c-kapitel13.html"><strong aria-hidden="true">50.1.</strong> 13 Dynamische Datenstrukturen</a></span></li></ol><li class="chapter-item expanded "><li class="part-title">Phase 7: Fearless Concurrency (Nebenläufigkeit)</li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase7-konzepte.html"><strong aria-hidden="true">51.</strong> Konzepte statt Syntax lernen</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-threads.html"><strong aria-hidden="true">51.1.</strong> Threads &amp; Shared State</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-channels.html"><strong aria-hidden="true">51.2.</strong> Channels &amp; Nachrichtenaustausch</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-async.html"><strong aria-hidden="true">51.3.</strong> Async/Await &amp; Tokio-Grundlagen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="rust-web-backend.html"><strong aria-hidden="true">51.4.</strong> 🌐 Web-Backend &amp; REST APIs (Axum &amp; SQLx)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="rust-static-site-generator.html"><strong aria-hidden="true">51.5.</strong> ⚡ Static Site Generator: Eigene Website mit Rust bauen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="rust-wiki-cms.html"><strong aria-hidden="true">51.6.</strong> 🚀 Eigenes Wiki-CMS in Rust bauen (MeinCMS-Architektur)</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-1-terminal-wiki.html"><strong aria-hidden="true">51.6.1.</strong> 📟 Wissenssystem Stufe 1: Das Terminal-Wiki (CLI-Glossar)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-2-static-generator.html"><strong aria-hidden="true">51.6.2.</strong> ⚡ Wissenssystem Stufe 2: Der statische Wiki-Generator</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-3-web-wiki.html"><strong aria-hidden="true">51.6.3.</strong> 🌐 Wissenssystem Stufe 3: Das interaktive Web-Wiki</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-4-zettelkasten.html"><strong aria-hidden="true">51.6.4.</strong> 🧠 Wissenssystem Stufe 4: Das Zettelkasten-System mit Backlinks &amp; Graph</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-5-ki-rag-wiki.html"><strong aria-hidden="true">51.6.5.</strong> 🤖 Wissenssystem Stufe 5: Das KI-gestützte RAG-Wissenssystem</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-mediawiki-rust.html"><strong aria-hidden="true">51.6.6.</strong> 🏛️ Alternativer Ansatz: Eine MediaWiki-Engine in Rust nachbauen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-xwiki-rust.html"><strong aria-hidden="true">51.6.7.</strong> 🏰 Alternativer Ansatz: Eine XWiki Enterprise-Engine in Rust nachbauen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-drupal-rust.html"><strong aria-hidden="true">51.6.8.</strong> 💧 Alternativer Ansatz: Eine Drupal-Entity-Engine in Rust nachbauen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-typo3-rust.html"><strong aria-hidden="true">51.6.9.</strong> 🧡 Alternativer Ansatz: Eine TYPO3-PageTree-Engine in Rust nachbauen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-obsidian-rust.html"><strong aria-hidden="true">51.6.10.</strong> 📓 Alternativer Ansatz: Eine Obsidian-Engine in Rust nachbauen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-openwiki-rust.html"><strong aria-hidden="true">51.6.11.</strong> 🌐 Alternativer Ansatz: Eine OpenWiki-Engine in Rust nachbauen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-best-of-both-worlds.html"><strong aria-hidden="true">51.6.12.</strong> 🌉 Best of Both Worlds: Vom Wissenssystem zum Enterprise CMS</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-alt-1-anki-trainer.html"><strong aria-hidden="true">51.6.13.</strong> 📇 Alternativ-System 1: Der Anki Karteikarten-Trainer</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-alt-2-cheatsheet-manager.html"><strong aria-hidden="true">51.6.14.</strong> ⚡ Alternativ-System 2: Der Entwickler-Cheatsheet-Manager</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-alt-3-outliner-mindmap.html"><strong aria-hidden="true">51.6.15.</strong> 🌲 Alternativ-System 3: Das Outliner / Mindmap Baum-Notizsystem</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-alt-4-knowledge-graph.html"><strong aria-hidden="true">51.6.16.</strong> 🕸️ Alternativ-System 4: Der Knowledge Graph</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-alt-5-voice-notes.html"><strong aria-hidden="true">51.6.17.</strong> 🎙️ Alternativ-System 5: Das Voice-Notes Audio-Wissensarchiv</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-lms-rust.html"><strong aria-hidden="true">51.6.18.</strong> 🎓 Eigenes Lernmanagementsystem (LMS) in Rust bauen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-autorensystem-elearning.html"><strong aria-hidden="true">51.6.19.</strong> ✍️ Eigene Autorensysteme für E-Learning &amp; Schulungen programmieren</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-autorensystem-cms-integration.html"><strong aria-hidden="true">51.6.20.</strong> ✍️ Integration: Autorensysteme direkt in CMS &amp; Wissensmanagement einbauen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-lms-ext-1-gamification.html"><strong aria-hidden="true">51.6.21.</strong> 🎮 LMS-Erweiterung 1: Gamification &amp; Open Badges Engine (XP, Streaks &amp; Badges)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-lms-ext-2-xapi-lrs.html"><strong aria-hidden="true">51.6.22.</strong> 📊 LMS-Erweiterung 2: xAPI Analytics &amp; Learning Record Store (LRS)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-lms-ext-3-plagiatsscanner.html"><strong aria-hidden="true">51.6.23.</strong> 🔎 LMS-Erweiterung 3: Code- &amp; Text-Plagiatsscanner (AST-Vergleich &amp; Levenshtein)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-lms-ext-4-adaptives-lernen.html"><strong aria-hidden="true">51.6.24.</strong> 🧠 LMS-Erweiterung 4: Adaptives Lernen &amp; Dynamische Lernpfade</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-profi-1-volltextsuche.html"><strong aria-hidden="true">51.6.25.</strong> 🔍 Profi-Baustein 1: Die eigene Volltext-Suchmaschine (Inverted Index &amp; BM25)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-profi-2-crdt-kollaboration.html"><strong aria-hidden="true">51.6.26.</strong> 👥 Profi-Baustein 2: Echtzeit-Kollaboration mit CRDTs &amp; Parallelem Schreiben</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-profi-3-vektordatenbank.html"><strong aria-hidden="true">51.6.27.</strong> 📐 Profi-Baustein 3: Die eigene Vektor-Datenbank (Embeddings &amp; Kosinus-Ähnlichkeit)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-profi-4-e2ee-sync.html"><strong aria-hidden="true">51.6.28.</strong> 🔒 Profi-Baustein 4: Ende-zu-Ende verschlüsselte Synchronisation &amp; Offline-First</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-pkm-second-brain-app.html"><strong aria-hidden="true">51.6.29.</strong> 🧠 Das eigene &quot;Zweite Gehirn&quot; (PKM-Tool) in Rust bauen: CLI, Desktop-GUI &amp; Web</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="wissenssystem-ki-knowledge-management.html"><strong aria-hidden="true">51.6.30.</strong> 🤖 KI-gestützte Wissensmanagementsysteme: Lokale LLMs, Auto-Tagging &amp; KI-Agenten</a></span></li></ol></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase7-workshop.html"><strong aria-hidden="true">52.</strong> 📦 Mitmach-Workshop: Phase 7 bildhaft verstehen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase7.html"><strong aria-hidden="true">53.</strong> Projektvorschläge Phase 7</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="100-projekte-phase7.html"><strong aria-hidden="true">54.</strong> 100 Projekte - Fearless Concurrency</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="100-projekte-prompts-phase7.html"><strong aria-hidden="true">55.</strong> 100 Projekte – Nur Prompts (Modulares Prinzip)</a></span></li><li class="chapter-item expanded "><li class="part-title">Phase 8: Idiomatisches Rust (Iteratoren &amp; Closures)</li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase8-konzepte.html"><strong aria-hidden="true">56.</strong> Konzepte statt Syntax lernen</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-closures.html"><strong aria-hidden="true">56.1.</strong> Closures &amp; Variablen-Einfangung</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-iteratoren.html"><strong aria-hidden="true">56.2.</strong> Iteratoren &amp; Das Iterator-Trait</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-ketten.html"><strong aria-hidden="true">56.3.</strong> Iterator-Ketten &amp; Adapter</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase8-workshop.html"><strong aria-hidden="true">57.</strong> 📦 Mitmach-Workshop: Phase 8 bildhaft verstehen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase8.html"><strong aria-hidden="true">58.</strong> Projektvorschläge Phase 8</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="100-projekte-phase8.html"><strong aria-hidden="true">59.</strong> 100 Projekte - Iteratoren &amp; Closures</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="100-projekte-prompts-phase8.html"><strong aria-hidden="true">60.</strong> 100 Projekte – Nur Prompts (Modulares Prinzip)</a></span></li><li class="chapter-item expanded "><li class="part-title">Phase 9: Systemprogrammierung (Unsafe Rust &amp; FFI)</li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase9-konzepte.html"><strong aria-hidden="true">61.</strong> Konzepte statt Syntax lernen</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-unsafe.html"><strong aria-hidden="true">61.1.</strong> Unsafe Rust &amp; Rohe Zeiger</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-ffi.html"><strong aria-hidden="true">61.2.</strong> FFI (Anbindung an C-Bibliotheken)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="c-abi-erklaerung.html"><strong aria-hidden="true">61.3.</strong> 🔌 Das C-ABI: Die universelle Brücke zwischen Sprachen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="rust-build-skripte-ffi.html"><strong aria-hidden="true">61.4.</strong> ⚙️ Build-Skripte (build.rs) &amp; C/C++-Integration</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="rust-wasm.html"><strong aria-hidden="true">61.5.</strong> 🌐 WebAssembly (WASM) &amp; Rust im Browser</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="rust-embedded-nostd.html"><strong aria-hidden="true">61.6.</strong> 📟 Bare-Metal &amp; Embedded Rust (no_std)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="rust-kryptographie.html"><strong aria-hidden="true">61.7.</strong> 🔒 Kryptographie &amp; Sicherheit in Rust</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase9-workshop.html"><strong aria-hidden="true">62.</strong> 📦 Mitmach-Workshop: Phase 9 bildhaft verstehen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase9.html"><strong aria-hidden="true">63.</strong> Projektvorschläge Phase 9</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="100-projekte-phase9.html"><strong aria-hidden="true">64.</strong> 100 Projekte - Unsafe &amp; FFI</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="100-projekte-prompts-phase9.html"><strong aria-hidden="true">65.</strong> 100 Projekte – Nur Prompts (Modulares Prinzip)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="c-kapitel10.html"><strong aria-hidden="true">66.</strong> 10 Zeiger (Pointer)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="cpp-kapitel07.html"><strong aria-hidden="true">67.</strong> 7 Referenzen und Zeiger</a></span></li><li class="chapter-item expanded "><li class="part-title">Phase 10: Metaprogrammierung (Makros)</li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase10-konzepte.html"><strong aria-hidden="true">68.</strong> Konzepte statt Syntax lernen</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-makros-deklarativ.html"><strong aria-hidden="true">68.1.</strong> Deklarative Makros (macro_rules!)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="konzept-makros-prozedural.html"><strong aria-hidden="true">68.2.</strong> Prozedurale Makros (Derive &amp; Attribute)</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase10-workshop.html"><strong aria-hidden="true">69.</strong> 📦 Mitmach-Workshop: Phase 10 bildhaft verstehen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="phase10.html"><strong aria-hidden="true">70.</strong> Projektvorschläge Phase 10</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="100-projekte-phase10.html"><strong aria-hidden="true">71.</strong> 100 Projekte - Makros &amp; Metaprogrammierung</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="100-projekte-prompts-phase10.html"><strong aria-hidden="true">72.</strong> 100 Projekte – Nur Prompts (Modulares Prinzip)</a></span></li><li class="chapter-item expanded "><li class="part-title">🤖 Bonus: KI als Lernpartner</li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="antigravity.html"><strong aria-hidden="true">73.</strong> Antigravity – CLI, 2.0 &amp; IDE</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="agy-cli-workflows.html"><strong aria-hidden="true">74.</strong> Antigravity CLI – Workflows &amp; Steuerung</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="agy-cli-automatisieren.html"><strong aria-hidden="true">75.</strong> Automatisieren</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="agy-cli-wissendatenbank.html"><strong aria-hidden="true">76.</strong> Projekt Wissendatenbank</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="agy-cli-bessere-loesungen.html"><strong aria-hidden="true">77.</strong> Auf bessere Lösungen kommen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="agy-cli-mcp.html"><strong aria-hidden="true">78.</strong> MCP Server nutzen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="agy-cli-dokumentation.html"><strong aria-hidden="true">79.</strong> Dokumentation &amp; Handbücher</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="agy-cli-skripte.html"><strong aria-hidden="true">80.</strong> Skripte &amp; App-Steuerung</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="agy-sdk.html"><strong aria-hidden="true">81.</strong> Das AGY SDK nutzen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="agy-cli-mega-praxis.html"><strong aria-hidden="true">82.</strong> 100+ Praxis-Übungen (Katalog)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="antigravity-praxis.html"><strong aria-hidden="true">83.</strong> Antigravity Praxis-Projekte</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="gemini.html"><strong aria-hidden="true">84.</strong> 💎 Google Gemini als Lernpartner</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="copilot.html"><strong aria-hidden="true">85.</strong> 🐙 GitHub Copilot – Der klassische Assistent</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="copilot-workflows.html"><strong aria-hidden="true">85.1.</strong> Workflows &amp; Steuerung</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="copilot-automatisieren.html"><strong aria-hidden="true">85.2.</strong> Automatisieren</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="ide-agent.html"><strong aria-hidden="true">86.</strong> 🤖 IDE KI-Agenten – Die nächste Generation</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="claude-code.html"><strong aria-hidden="true">87.</strong> 🐚 Claude Code – Der KI-Agent im Terminal</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="claude-code-workflows.html"><strong aria-hidden="true">87.1.</strong> Workflows &amp; Steuerung</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="claude-code-automatisieren.html"><strong aria-hidden="true">87.2.</strong> Automatisieren</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="claude-code-wissendatenbank.html"><strong aria-hidden="true">87.3.</strong> Projekt Wissendatenbank</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="claude-code-bessere-loesungen.html"><strong aria-hidden="true">87.4.</strong> Auf bessere Lösungen kommen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="claude-code-mcp.html"><strong aria-hidden="true">87.5.</strong> MCP Server nutzen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="claude-code-dokumentation.html"><strong aria-hidden="true">87.6.</strong> Dokumentation &amp; Handbücher</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="claude-code-skripte.html"><strong aria-hidden="true">87.7.</strong> Skripte &amp; App-Steuerung</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="claude-sdk.html"><strong aria-hidden="true">87.8.</strong> Das Claude SDK nutzen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="claude-code-mega-praxis.html"><strong aria-hidden="true">87.9.</strong> 100+ Praxis-Übungen (Katalog)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="claude-code-praxis-1.html"><strong aria-hidden="true">87.10.</strong> Praxis 1: Grundlagen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="claude-code-praxis-2.html"><strong aria-hidden="true">87.11.</strong> Praxis 2: Profi-Workflows</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="codex-cli.html"><strong aria-hidden="true">88.</strong> 💻 Codex CLI – Der Terminal-Assistent von OpenAI</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="codex-cli-workflows.html"><strong aria-hidden="true">88.1.</strong> Workflows &amp; Steuerung</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="codex-cli-automatisieren.html"><strong aria-hidden="true">88.2.</strong> Automatisieren</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="codex-cli-wissendatenbank.html"><strong aria-hidden="true">88.3.</strong> Projekt Wissendatenbank</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="codex-cli-bessere-loesungen.html"><strong aria-hidden="true">88.4.</strong> Auf bessere Lösungen kommen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="codex-cli-mcp.html"><strong aria-hidden="true">88.5.</strong> MCP Server nutzen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="codex-cli-dokumentation.html"><strong aria-hidden="true">88.6.</strong> Dokumentation &amp; Handbücher</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="codex-cli-skripte.html"><strong aria-hidden="true">88.7.</strong> Skripte &amp; App-Steuerung</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="codex-sdk.html"><strong aria-hidden="true">88.8.</strong> Das OpenAI/Codex SDK nutzen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="codex-cli-mega-praxis.html"><strong aria-hidden="true">88.9.</strong> 100+ Praxis-Übungen (Katalog)</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="zed-ide.html"><strong aria-hidden="true">89.</strong> ⚡ Zed IDE – Der performante Editor mit KI</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="vim.html"><strong aria-hidden="true">90.</strong> 📝 Vim – Der tastaturgesteuerte Editor</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="vibe-coding.html"><strong aria-hidden="true">91.</strong> 🎵 Vibe Coding – Programmieren im Flow</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="eigener-agent.html"><strong aria-hidden="true">92.</strong> 🧠 Eigene KI-Agenten programmieren</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="eigenen-compiler-bauen.html"><strong aria-hidden="true">93.</strong> 🛠️ Eigener Compiler: Schritt für Schritt mit Rust &amp; LLVM</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="eigenen-transpiler-c-bauen.html"><strong aria-hidden="true">94.</strong> 📝 Eigenen Transpiler bauen: C-Code-Generierung mit Rust</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="rust-gui-tauri-egui.html"><strong aria-hidden="true">95.</strong> 🖥️ GUI-Entwicklung: Benutzeroberflächen mit Tauri &amp; egui</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="rust-bevy-wgpu.html"><strong aria-hidden="true">96.</strong> 🎮 Spieleentwicklung &amp; Grafik (Bevy &amp; WGPU)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="llm-anbieter-vergleich.html"><strong aria-hidden="true">97.</strong> 🌐 Multi-LLM- &amp; Sprachmodell-Anbieter im Vergleich</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="coding-mit-ki-praxisbuch.html"><strong aria-hidden="true">98.</strong> 📖 Coding mit KI – Das Praxisbuch (Inhaltsverzeichnis)</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="coding-mit-ki-phase2.html"><strong aria-hidden="true">98.1.</strong> 💡 Phase 2: Eigene Datentypen</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="coding-mit-ki-phase3.html"><strong aria-hidden="true">98.2.</strong> 💡 Phase 3: Fehlerbehandlung &amp; Collections</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="coding-mit-ki-phase4.html"><strong aria-hidden="true">98.3.</strong> 💡 Phase 4: Module, Pfade, Packages &amp; Multi-File</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="coding-mit-ki-phase5.html"><strong aria-hidden="true">98.4.</strong> 💡 Phase 5: Generics &amp; Interfaces</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="coding-mit-ki-phase6.html"><strong aria-hidden="true">98.5.</strong> 💡 Phase 6: Speicherverwaltung &amp; Sicherheit</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="coding-mit-ki-phase7.html"><strong aria-hidden="true">98.6.</strong> 💡 Phase 7: Nebenläufigkeit &amp; Asynchronität</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="coding-mit-ki-phase8.html"><strong aria-hidden="true">98.7.</strong> 💡 Phase 8: Idiomatisches Programmieren</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="coding-mit-ki-phase9.html"><strong aria-hidden="true">98.8.</strong> 💡 Phase 9: Fortgeschrittene Integration &amp; APIs</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="coding-mit-ki-phase10.html"><strong aria-hidden="true">98.9.</strong> 💡 Phase 10: Metaprogrammierung &amp; Agentic Coding</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="Impressum.html"><strong aria-hidden="true">99.</strong> Impressum</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="Datenschschutz.html"><strong aria-hidden="true">100.</strong> Datenschutz</a></span></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split('#')[0].split('?')[0];
        if (current_page.endsWith('/')) {
            current_page += 'index.html';
        }
        const links = Array.prototype.slice.call(this.querySelectorAll('a'));
        const l = links.length;
        for (let i = 0; i < l; ++i) {
            const link = links[i];
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The 'index' page is supposed to alias the first chapter in the book.
            // Check both with and without the '.html' suffix to be robust against pretty URLs
            if (link.href.replace(/\.html$/, '') === current_page.replace(/\.html$/, '')
                || i === 0
                && path_to_root === ''
                && current_page.endsWith('/index.html')) {
                link.classList.add('active');
                let parent = link.parentElement;
                while (parent) {
                    if (parent.tagName === 'LI' && parent.classList.contains('chapter-item')) {
                        parent.classList.add('expanded');
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', e => {
            if (e.target.tagName === 'A') {
                const clientRect = e.target.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                sessionStorage.setItem('sidebar-scroll-offset', clientRect.top - sidebarRect.top);
            }
        }, { passive: true });
        const sidebarScrollOffset = sessionStorage.getItem('sidebar-scroll-offset');
        sessionStorage.removeItem('sidebar-scroll-offset');
        if (sidebarScrollOffset !== null) {
            // preserve sidebar scroll position when navigating via links within sidebar
            const activeSection = this.querySelector('.active');
            if (activeSection) {
                const clientRect = activeSection.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                const currentOffset = clientRect.top - sidebarRect.top;
                this.scrollTop += currentOffset - parseFloat(sidebarScrollOffset);
            }
        } else {
            // scroll sidebar to current active section when navigating via
            // 'next/previous chapter' buttons
            const activeSection = document.querySelector('#mdbook-sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        const sidebarAnchorToggles = document.querySelectorAll('.chapter-fold-toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(el => {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define('mdbook-sidebar-scrollbox', MDBookSidebarScrollbox);


// ---------------------------------------------------------------------------
// Support for dynamically adding headers to the sidebar.

(function() {
    // This is used to detect which direction the page has scrolled since the
    // last scroll event.
    let lastKnownScrollPosition = 0;
    // This is the threshold in px from the top of the screen where it will
    // consider a header the "current" header when scrolling down.
    const defaultDownThreshold = 150;
    // Same as defaultDownThreshold, except when scrolling up.
    const defaultUpThreshold = 300;
    // The threshold is a virtual horizontal line on the screen where it
    // considers the "current" header to be above the line. The threshold is
    // modified dynamically to handle headers that are near the bottom of the
    // screen, and to slightly offset the behavior when scrolling up vs down.
    let threshold = defaultDownThreshold;
    // This is used to disable updates while scrolling. This is needed when
    // clicking the header in the sidebar, which triggers a scroll event. It
    // is somewhat finicky to detect when the scroll has finished, so this
    // uses a relatively dumb system of disabling scroll updates for a short
    // time after the click.
    let disableScroll = false;
    // Array of header elements on the page.
    let headers;
    // Array of li elements that are initially collapsed headers in the sidebar.
    // I'm not sure why eslint seems to have a false positive here.
    // eslint-disable-next-line prefer-const
    let headerToggles = [];
    // This is a debugging tool for the threshold which you can enable in the console.
    let thresholdDebug = false;

    // Updates the threshold based on the scroll position.
    function updateThreshold() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // The number of pixels below the viewport, at most documentHeight.
        // This is used to push the threshold down to the bottom of the page
        // as the user scrolls towards the bottom.
        const pixelsBelow = Math.max(0, documentHeight - (scrollTop + windowHeight));
        // The number of pixels above the viewport, at least defaultDownThreshold.
        // Similar to pixelsBelow, this is used to push the threshold back towards
        // the top when reaching the top of the page.
        const pixelsAbove = Math.max(0, defaultDownThreshold - scrollTop);
        // How much the threshold should be offset once it gets close to the
        // bottom of the page.
        const bottomAdd = Math.max(0, windowHeight - pixelsBelow - defaultDownThreshold);
        let adjustedBottomAdd = bottomAdd;

        // Adjusts bottomAdd for a small document. The calculation above
        // assumes the document is at least twice the windowheight in size. If
        // it is less than that, then bottomAdd needs to be shrunk
        // proportional to the difference in size.
        if (documentHeight < windowHeight * 2) {
            const maxPixelsBelow = documentHeight - windowHeight;
            const t = 1 - pixelsBelow / Math.max(1, maxPixelsBelow);
            const clamp = Math.max(0, Math.min(1, t));
            adjustedBottomAdd *= clamp;
        }

        let scrollingDown = true;
        if (scrollTop < lastKnownScrollPosition) {
            scrollingDown = false;
        }

        if (scrollingDown) {
            // When scrolling down, move the threshold up towards the default
            // downwards threshold position. If near the bottom of the page,
            // adjustedBottomAdd will offset the threshold towards the bottom
            // of the page.
            const amountScrolledDown = scrollTop - lastKnownScrollPosition;
            const adjustedDefault = defaultDownThreshold + adjustedBottomAdd;
            threshold = Math.max(adjustedDefault, threshold - amountScrolledDown);
        } else {
            // When scrolling up, move the threshold down towards the default
            // upwards threshold position. If near the bottom of the page,
            // quickly transition the threshold back up where it normally
            // belongs.
            const amountScrolledUp = lastKnownScrollPosition - scrollTop;
            const adjustedDefault = defaultUpThreshold - pixelsAbove
                + Math.max(0, adjustedBottomAdd - defaultDownThreshold);
            threshold = Math.min(adjustedDefault, threshold + amountScrolledUp);
        }

        if (documentHeight <= windowHeight) {
            threshold = 0;
        }

        if (thresholdDebug) {
            const id = 'mdbook-threshold-debug-data';
            let data = document.getElementById(id);
            if (data === null) {
                data = document.createElement('div');
                data.id = id;
                data.style.cssText = `
                    position: fixed;
                    top: 50px;
                    right: 10px;
                    background-color: 0xeeeeee;
                    z-index: 9999;
                    pointer-events: none;
                `;
                document.body.appendChild(data);
            }
            data.innerHTML = `
                <table>
                  <tr><td>documentHeight</td><td>${documentHeight.toFixed(1)}</td></tr>
                  <tr><td>windowHeight</td><td>${windowHeight.toFixed(1)}</td></tr>
                  <tr><td>scrollTop</td><td>${scrollTop.toFixed(1)}</td></tr>
                  <tr><td>pixelsAbove</td><td>${pixelsAbove.toFixed(1)}</td></tr>
                  <tr><td>pixelsBelow</td><td>${pixelsBelow.toFixed(1)}</td></tr>
                  <tr><td>bottomAdd</td><td>${bottomAdd.toFixed(1)}</td></tr>
                  <tr><td>adjustedBottomAdd</td><td>${adjustedBottomAdd.toFixed(1)}</td></tr>
                  <tr><td>scrollingDown</td><td>${scrollingDown}</td></tr>
                  <tr><td>threshold</td><td>${threshold.toFixed(1)}</td></tr>
                </table>
            `;
            drawDebugLine();
        }

        lastKnownScrollPosition = scrollTop;
    }

    function drawDebugLine() {
        if (!document.body) {
            return;
        }
        const id = 'mdbook-threshold-debug-line';
        const existingLine = document.getElementById(id);
        if (existingLine) {
            existingLine.remove();
        }
        const line = document.createElement('div');
        line.id = id;
        line.style.cssText = `
            position: fixed;
            top: ${threshold}px;
            left: 0;
            width: 100vw;
            height: 2px;
            background-color: red;
            z-index: 9999;
            pointer-events: none;
        `;
        document.body.appendChild(line);
    }

    function mdbookEnableThresholdDebug() {
        thresholdDebug = true;
        updateThreshold();
        drawDebugLine();
    }

    window.mdbookEnableThresholdDebug = mdbookEnableThresholdDebug;

    // Updates which headers in the sidebar should be expanded. If the current
    // header is inside a collapsed group, then it, and all its parents should
    // be expanded.
    function updateHeaderExpanded(currentA) {
        // Add expanded to all header-item li ancestors.
        let current = currentA.parentElement;
        while (current) {
            if (current.tagName === 'LI' && current.classList.contains('header-item')) {
                current.classList.add('expanded');
            }
            current = current.parentElement;
        }
    }

    // Updates which header is marked as the "current" header in the sidebar.
    // This is done with a virtual Y threshold, where headers at or below
    // that line will be considered the current one.
    function updateCurrentHeader() {
        if (!headers || !headers.length) {
            return;
        }

        // Reset the classes, which will be rebuilt below.
        const els = document.getElementsByClassName('current-header');
        for (const el of els) {
            el.classList.remove('current-header');
        }
        for (const toggle of headerToggles) {
            toggle.classList.remove('expanded');
        }

        // Find the last header that is above the threshold.
        let lastHeader = null;
        for (const header of headers) {
            const rect = header.getBoundingClientRect();
            if (rect.top <= threshold) {
                lastHeader = header;
            } else {
                break;
            }
        }
        if (lastHeader === null) {
            lastHeader = headers[0];
            const rect = lastHeader.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top >= windowHeight) {
                return;
            }
        }

        // Get the anchor in the summary.
        const href = '#' + lastHeader.id;
        const a = [...document.querySelectorAll('.header-in-summary')]
            .find(element => element.getAttribute('href') === href);
        if (!a) {
            return;
        }

        a.classList.add('current-header');

        updateHeaderExpanded(a);
    }

    // Updates which header is "current" based on the threshold line.
    function reloadCurrentHeader() {
        if (disableScroll) {
            return;
        }
        updateThreshold();
        updateCurrentHeader();
    }


    // When clicking on a header in the sidebar, this adjusts the threshold so
    // that it is located next to the header. This is so that header becomes
    // "current".
    function headerThresholdClick(event) {
        // See disableScroll description why this is done.
        disableScroll = true;
        setTimeout(() => {
            disableScroll = false;
        }, 100);
        // requestAnimationFrame is used to delay the update of the "current"
        // header until after the scroll is done, and the header is in the new
        // position.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Closest is needed because if it has child elements like <code>.
                const a = event.target.closest('a');
                const href = a.getAttribute('href');
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    threshold = targetElement.getBoundingClientRect().bottom;
                    updateCurrentHeader();
                }
            });
        });
    }

    // Takes the nodes from the given head and copies them over to the
    // destination, along with some filtering.
    function filterHeader(source, dest) {
        const clone = source.cloneNode(true);
        clone.querySelectorAll('mark').forEach(mark => {
            mark.replaceWith(...mark.childNodes);
        });
        dest.append(...clone.childNodes);
    }

    // Scans page for headers and adds them to the sidebar.
    document.addEventListener('DOMContentLoaded', function() {
        const activeSection = document.querySelector('#mdbook-sidebar .active');
        if (activeSection === null) {
            return;
        }

        const main = document.getElementsByTagName('main')[0];
        headers = Array.from(main.querySelectorAll('h2, h3, h4, h5, h6'))
            .filter(h => h.id !== '' && h.children.length && h.children[0].tagName === 'A');

        if (headers.length === 0) {
            return;
        }

        // Build a tree of headers in the sidebar.

        const stack = [];

        const firstLevel = parseInt(headers[0].tagName.charAt(1));
        for (let i = 1; i < firstLevel; i++) {
            const ol = document.createElement('ol');
            ol.classList.add('section');
            if (stack.length > 0) {
                stack[stack.length - 1].ol.appendChild(ol);
            }
            stack.push({level: i + 1, ol: ol});
        }

        // The level where it will start folding deeply nested headers.
        const foldLevel = 3;

        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            const level = parseInt(header.tagName.charAt(1));

            const currentLevel = stack[stack.length - 1].level;
            if (level > currentLevel) {
                // Begin nesting to this level.
                for (let nextLevel = currentLevel + 1; nextLevel <= level; nextLevel++) {
                    const ol = document.createElement('ol');
                    ol.classList.add('section');
                    const last = stack[stack.length - 1];
                    const lastChild = last.ol.lastChild;
                    // Handle the case where jumping more than one nesting
                    // level, which doesn't have a list item to place this new
                    // list inside of.
                    if (lastChild) {
                        lastChild.appendChild(ol);
                    } else {
                        last.ol.appendChild(ol);
                    }
                    stack.push({level: nextLevel, ol: ol});
                }
            } else if (level < currentLevel) {
                while (stack.length > 1 && stack[stack.length - 1].level > level) {
                    stack.pop();
                }
            }

            const li = document.createElement('li');
            li.classList.add('header-item');
            li.classList.add('expanded');
            if (level < foldLevel) {
                li.classList.add('expanded');
            }
            const span = document.createElement('span');
            span.classList.add('chapter-link-wrapper');
            const a = document.createElement('a');
            span.appendChild(a);
            a.href = '#' + header.id;
            a.classList.add('header-in-summary');
            filterHeader(header.children[0], a);
            a.addEventListener('click', headerThresholdClick);
            const nextHeader = headers[i + 1];
            if (nextHeader !== undefined) {
                const nextLevel = parseInt(nextHeader.tagName.charAt(1));
                if (nextLevel > level && level >= foldLevel) {
                    const toggle = document.createElement('a');
                    toggle.classList.add('chapter-fold-toggle');
                    toggle.classList.add('header-toggle');
                    toggle.addEventListener('click', () => {
                        li.classList.toggle('expanded');
                    });
                    const toggleDiv = document.createElement('div');
                    toggleDiv.textContent = '❱';
                    toggle.appendChild(toggleDiv);
                    span.appendChild(toggle);
                    headerToggles.push(li);
                }
            }
            li.appendChild(span);

            const currentParent = stack[stack.length - 1];
            currentParent.ol.appendChild(li);
        }

        const onThisPage = document.createElement('div');
        onThisPage.classList.add('on-this-page');
        onThisPage.append(stack[0].ol);
        const activeItemSpan = activeSection.parentElement;
        activeItemSpan.after(onThisPage);
    });

    document.addEventListener('DOMContentLoaded', reloadCurrentHeader);
    document.addEventListener('scroll', reloadCurrentHeader, { passive: true });
})();

