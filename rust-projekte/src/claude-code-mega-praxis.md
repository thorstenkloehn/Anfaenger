# 🐚 Claude Code – Der 100+ Praxis-Übungen Katalog

Willkommen zum gigantischen Übungskatalog für Claude Code! Hier findest du über 100 kleine, knackige Aufgaben, mit denen du deine Fähigkeiten im Umgang mit KI-gestützter Entwicklung trainieren kannst. Denk daran: Es gibt hier keine fertigen Lösungen, nur Hinweise, damit du selbst auf den richtigen Weg kommst.

## 1. Workflows & Steuerung

**Theorie:** Claude Code ist am stärksten, wenn du ihn gezielt steuerst. Nutze präzise Prompts und Iterationen, um dich an dein Ziel heranzutasten.

1. **Aufgabe:** Bitte Claude, eine Projektstruktur für ein neues Rust-Tool anzulegen, ohne Code zu schreiben. **Hinweis:** Nutze Befehle, die nur die Struktur beschreiben.
2. **Aufgabe:** Lass Claude eine bestehende `main.rs` analysieren und die Hauptfunktionen auflisten. **Hinweis:** Ein einfaches "Erkläre mir diese Datei" reicht oft.
3. **Aufgabe:** Unterbrich Claude mitten in einer langen Generierung. **Hinweis:** Übe den Abbruch-Shortcut deines Terminals (meist Ctrl+C).
4. **Aufgabe:** Frage Claude nach dem Unterschied zwischen `/help` und `/compact`. **Hinweis:** Nutze die eingebauten Hilfebefehle.
5. **Aufgabe:** Fordere Claude auf, nur in kurzen, stichpunktartigen Sätzen zu antworten. **Hinweis:** Gib ihm klare Formatierungsregeln mit.
6. **Aufgabe:** Lass Claude eine fehlerhafte Cargo.toml überprüfen, ohne den Fehler direkt zu benennen. **Hinweis:** "Warum baut dieses Projekt nicht?"
7. **Aufgabe:** Bitte Claude, dir drei mögliche Lösungswege für ein Problem zu skizzieren, bevor er Code vorschlägt. **Hinweis:** Zwinge ihn zur Planung.
8. **Aufgabe:** Lass dir von Claude erklären, wie man eine Datei in Git ignoriert. **Hinweis:** Frag nach Best Practices für `.gitignore`.
9. **Aufgabe:** Nutze Claude, um einen Regex-Ausdruck zu generieren und zu erklären. **Hinweis:** Beschreibe genau, was du filtern willst.
10. **Aufgabe:** Lass Claude eine Terminal-Fehlermeldung übersetzen und vereinfachen. **Hinweis:** Kopiere den Fehler 1:1 rein.
11. **Aufgabe:** Bitte Claude, dir die Vor- und Nachteile von zwei verschiedenen Rust-Crates (z.B. serde vs. miniserde) gegenüberzustellen. **Hinweis:** Frage gezielt nach Trade-offs.
12. **Aufgabe:** Lass Claude einen Kommentarblock für eine Funktion entwerfen. **Hinweis:** Fokussiere dich auf Dokumentations-Standards.
13. **Aufgabe:** Gib Claude absichtlich eine vage Anweisung und beobachte, wie er nachfragt. **Hinweis:** "Mach das Programm schneller."
14. **Aufgabe:** Bitte Claude, eine Log-Datei auf Auffälligkeiten zu untersuchen. **Hinweis:** Du kannst Textausschnitte übergeben.
15. **Aufgabe:** Lass Claude dir erklären, wie man in Vim eine Datei speichert und schließt. **Hinweis:** Ein Klassiker für Terminal-Neulinge.
16. **Aufgabe:** Fordere Claude auf, dir den Unterschied zwischen Stack und Heap in eigenen Worten zu erklären. **Hinweis:** Bitte um eine Analogie.
17. **Aufgabe:** Lass Claude einen simplen Bash-Befehl zum Finden von Dateien zusammenstellen. **Hinweis:** "Wie finde ich alle .rs Dateien?"
18. **Aufgabe:** Bitte Claude, einen langen Text in drei Kernpunkte zusammenzufassen. **Hinweis:** Teste seine Fähigkeiten im Lesen von Dateien.
19. **Aufgabe:** Lass dir von Claude ein paar nützliche Git-Aliase vorschlagen. **Hinweis:** Frage nach Produktivitäts-Tipps.
20. **Aufgabe:** Bitte Claude, dir zu erklären, wie du seine Ausgabe in eine Datei umleiten kannst. **Hinweis:** Frage nach Terminal-Pipes.

## 2. Automatisieren

**Theorie:** Wiederkehrende Aufgaben sind prädestiniert für Automatisierung. Lerne, wie du KI nutzt, um Prozesse zu beschleunigen.

21. **Aufgabe:** Lass Claude ein Skript entwerfen (ohne Code!), das täglich Backups macht. **Hinweis:** Fokussiere dich auf den logischen Ablauf.
22. **Aufgabe:** Bitte Claude, einen GitHub Actions Workflow konzeptionell zu beschreiben. **Hinweis:** Welche Schritte sind für CI/CD nötig?
23. **Aufgabe:** Lass dir erklären, wie man mit `cron` Aufgaben zeitsteuert. **Hinweis:** Frage nach der Syntax.
24. **Aufgabe:** Fordere Claude auf, eine Strategie zur automatischen Code-Formatierung im Team zu entwickeln. **Hinweis:** Denk an Pre-commit Hooks.
25. **Aufgabe:** Bitte Claude um Ideen, wie man Release-Notes automatisch generieren könnte. **Hinweis:** Welche Git-Daten kann man nutzen?
26. **Aufgabe:** Lass Claude einen Workflow für automatisches Dependency-Update skizzieren. **Hinweis:** Stichwort: Dependabot oder Renovate.
27. **Aufgabe:** Frage Claude nach Möglichkeiten, Tests automatisch beim Speichern auszuführen. **Hinweis:** Tools wie `cargo watch`.
28. **Aufgabe:** Lass dir von Claude erklären, wie man Metadaten aus Bildern automatisch ausliest (Konzept). **Hinweis:** Welche Tools eignen sich dafür?
29. **Aufgabe:** Bitte Claude, eine Checkliste für ein automatisches Deployment-Skript zu erstellen. **Hinweis:** Was darf auf keinen Fall schiefgehen?
30. **Aufgabe:** Lass Claude Ideen für die Automatisierung von Code-Reviews sammeln. **Hinweis:** Was kann ein Linter abdecken?
31. **Aufgabe:** Frage nach einer Strategie, um verwaiste Dateien in einem Projekt automatisch zu finden. **Hinweis:** Welche Shell-Befehle helfen hier?
32. **Aufgabe:** Lass Claude ein Konzept für eine automatische Datenbank-Migration entwerfen. **Hinweis:** Wie geht man mit Versionen um?
33. **Aufgabe:** Bitte Claude um Vorschläge, wie man API-Dokumentation aus Code generieren kann. **Hinweis:** Swagger/OpenAPI.
34. **Aufgabe:** Lass dir erklären, wie man Docker-Images automatisch baut. **Hinweis:** Welche CI-Tools sind dafür üblich?
35. **Aufgabe:** Fordere Claude auf, eine Idee für einen automatischen Link-Checker in Markdown-Dateien zu skizzieren. **Hinweis:** Wie findet man Broken Links?
36. **Aufgabe:** Bitte Claude um ein Konzept für ein Skript, das große Dateien automatisch komprimiert. **Hinweis:** Wann soll das Skript laufen?
37. **Aufgabe:** Lass Claude eine Strategie zur automatischen Erkennung von Sicherheitslücken in Abhängigkeiten beschreiben. **Hinweis:** Tools wie `cargo audit`.
38. **Aufgabe:** Frage nach Möglichkeiten, Changelogs aus Commit-Messages zu parsen. **Hinweis:** Conventional Commits.
39. **Aufgabe:** Lass dir erklären, wie man automatische Benachrichtigungen bei Fehlern einrichtet. **Hinweis:** Webhooks zu Slack/Discord.
40. **Aufgabe:** Bitte Claude, einen Prozess zur automatischen Lokalisierung (Übersetzung) von Texten zu skizzieren. **Hinweis:** Wie synchronisiert man Sprachdateien?

## 3. Projekt Wissendatenbank

**Theorie:** Ein gutes Projekt dokumentiert sich fast von selbst. Nutze KI, um Wissen zu strukturieren und zugänglich zu machen.

41. **Aufgabe:** Lass Claude ein Template für ein gutes `README.md` erstellen. **Hinweis:** Welche Sektionen sind zwingend nötig?
42. **Aufgabe:** Bitte Claude, die Struktur eines Onboarding-Dokuments für neue Entwickler zu entwerfen. **Hinweis:** Was muss jemand an Tag 1 wissen?
43. **Aufgabe:** Lass dir von Claude vorschlagen, wie man Architekturentscheidungen dokumentiert (ADRs). **Hinweis:** Frage nach dem Format von Architecture Decision Records.
44. **Aufgabe:** Fordere Claude auf, einen Styleguide für API-Design zu skizzieren. **Hinweis:** Denk an Naming Conventions und Statuscodes.
45. **Aufgabe:** Bitte Claude um eine Checkliste für Code-Reviews. **Hinweis:** Was sollte man bei jedem Pull Request prüfen?
46. **Aufgabe:** Lass Claude eine Vorlage für Bug-Reports erstellen. **Hinweis:** Welche Infos (OS, Version, Steps to reproduce) fehlen oft?
47. **Aufgabe:** Frage Claude, wie man am besten eine Glossar-Datei für fachspezifische Begriffe anlegt. **Hinweis:** Wie hält man es aktuell?
48. **Aufgabe:** Lass dir erklären, wie man mit mdBook eine Dokumentation strukturiert. **Hinweis:** Welche Rolle spielt die `SUMMARY.md`?
49. **Aufgabe:** Bitte Claude, eine Strategie zur Dokumentation von Datenbank-Schemata zu entwerfen. **Hinweis:** Wo sollte das dokumentiert werden?
50. **Aufgabe:** Lass Claude ein Template für Feature-Requests entwerfen. **Hinweis:** Fokus auf den Business-Value.
51. **Aufgabe:** Frage nach Best Practices für das Kommentieren von komplexen Algorithmen. **Hinweis:** Warum statt Wie.
52. **Aufgabe:** Bitte Claude um Vorschläge, wie man "Tribal Knowledge" (Wissen in den Köpfen) dokumentierbar macht. **Hinweis:** Pair Programming und Interviews.
53. **Aufgabe:** Lass Claude eine Struktur für ein Troubleshooting-Handbuch (FAQ) skizzieren. **Hinweis:** Symptom -> Ursache -> Lösung.
54. **Aufgabe:** Fordere Claude auf, Richtlinien für gute Commit-Nachrichten zu formulieren. **Hinweis:** Denk an Präfixe wie `feat:` oder `fix:`.
55. **Aufgabe:** Bitte Claude um Ideen, wie man veraltete Dokumentation automatisch erkennt. **Hinweis:** Gibt es Tools für "Doc Rot"?
56. **Aufgabe:** Lass dir erklären, wie man Diagramme in Markdown (z.B. Mermaid) zur Dokumentation nutzt. **Hinweis:** Was sind die Vorteile von Text-to-Diagram?
57. **Aufgabe:** Frage Claude nach einer Vorlage für ein Security-Policy-Dokument. **Hinweis:** Wie meldet man Schwachstellen?
58. **Aufgabe:** Lass Claude eine Struktur für ein "Lessons Learned" (Post-Mortem) nach einem Fehlerfall entwerfen. **Hinweis:** Blame-free Culture.
59. **Aufgabe:** Bitte Claude um Tipps, wie man Dokumentation für Anfänger (wie dich) verständlicher macht. **Hinweis:** Jargon vermeiden.
60. **Aufgabe:** Lass dir erklären, wie man ein Changelog für Endbenutzer vs. für Entwickler schreibt. **Hinweis:** Unterschiedliche Zielgruppen.

## 4. Auf bessere Lösungen kommen

**Theorie:** KI hilft dir nicht nur beim Tippen, sondern auch beim Denken. Nutze sie als Sparringspartner für bessere Architektur.

61. **Aufgabe:** Lass Claude zwei Ansätze zur Fehlerbehandlung in Rust vergleichen (z.B. `unwrap` vs. Pattern Matching). **Hinweis:** Was ist robuster?
62. **Aufgabe:** Bitte Claude, dir das Konzept von "Dependency Injection" anhand einer Alltags-Analogie zu erklären. **Hinweis:** Frag nach einem Beispiel ohne Code.
63. **Aufgabe:** Lass dir von Claude aufzeigen, warum globale Variablen oft eine schlechte Idee sind. **Hinweis:** Stichwort: Side effects.
64. **Aufgabe:** Fordere Claude auf, dir "Test-Driven Development" (TDD) kritisch zu beleuchten (Pros/Cons). **Hinweis:** Wann lohnt es sich nicht?
65. **Aufgabe:** Bitte Claude, einen Entwurf für eine skalierbare Datei-Struktur in einem großen Projekt zu machen. **Hinweis:** Wie vermeidet man Chaos?
66. **Aufgabe:** Lass Claude erklären, was "Clean Code" wirklich bedeutet, jenseits von Buzzwords. **Hinweis:** Lesbarkeit vs. Cleverness.
67. **Aufgabe:** Frage nach Strategien, um "Spaghetti-Code" zu refactoren. **Hinweis:** Wo fängt man an?
68. **Aufgabe:** Bitte Claude um eine Erklärung, warum "Premature Optimization" die Wurzel allen Übels sein kann. **Hinweis:** Wann sollte man Code schneller machen?
69. **Aufgabe:** Lass dir das Prinzip "Don't Repeat Yourself" (DRY) und seine Grenzen erklären. **Hinweis:** Wann ist ein bisschen Duplikation okay?
70. **Aufgabe:** Fordere Claude auf, dir das Konzept von "State Machines" zu erklären und wann man sie nutzt. **Hinweis:** Wie vermeidet man wilde If-Else-Kaskaden?
71. **Aufgabe:** Bitte Claude, die Vor- und Nachteile von Microservices gegenüber einem Monolithen zu erörtern. **Hinweis:** Fokus auf Komplexität.
72. **Aufgabe:** Lass Claude erklären, wie man einen "Race Condition" in nebenläufigen Programmen findet. **Hinweis:** Warum sind sie so schwer zu debuggen?
73. **Aufgabe:** Frage nach dem "Single Responsibility Principle" (SRP) und lass dir ein Positiv-/Negativ-Beispiel beschreiben. **Hinweis:** Eine Funktion = Eine Aufgabe.
74. **Aufgabe:** Bitte Claude um Tipps, wie man Code so schreibt, dass er leicht zu testen ist. **Hinweis:** Was sind "Pure Functions"?
75. **Aufgabe:** Lass dir erklären, was "Technical Debt" (Technische Schulden) ist und wie man sie abbaut. **Hinweis:** Wann ist es okay, Schulden aufzunehmen?
76. **Aufgabe:** Fordere Claude auf, dir das Prinzip des "Fail Fast" zu erklären. **Hinweis:** Warum ist ein früher Absturz besser als falsche Daten?
77. **Aufgabe:** Bitte Claude um eine Erklärung von "Immutability" (Unveränderlichkeit) und deren Vorteile. **Hinweis:** Warum machen Konstanten das Leben leichter?
78. **Aufgabe:** Lass Claude den Unterschied zwischen Authentifizierung und Autorisierung erklären. **Hinweis:** Wer bist du vs. Was darfst du?
79. **Aufgabe:** Frage nach Best Practices für das Benennen von Variablen und Funktionen. **Hinweis:** Warum sind Abkürzungen meist schlecht?
80. **Aufgabe:** Bitte Claude, dir das Konzept von "Design Patterns" zu erklären und ob man sie immer nutzen muss. **Hinweis:** Sind sie manchmal Overkill?

## 5. MCP Server nutzen

**Theorie:** Der Model Context Protocol (MCP) Server ist eine Brücke zwischen Claude und deinem lokalen System oder externen Tools.

81. **Aufgabe:** Lass dir von Claude erklären, was ein MCP Server konzeptionell ist. **Hinweis:** Frag nach einer Metapher.
82. **Aufgabe:** Bitte Claude zu beschreiben, welche Art von Aufgaben man typischerweise an einen MCP Server auslagert. **Hinweis:** Denke an lokalen Dateizugriff.
83. **Aufgabe:** Lass Claude skizzieren, wie die Kommunikation zwischen ihm und einem MCP Server prinzipiell abläuft. **Hinweis:** Request/Response Muster.
84. **Aufgabe:** Fordere Claude auf, Sicherheitsbedenken beim Einsatz von MCP Servern zu nennen. **Hinweis:** Was passiert, wenn der Server zu viele Rechte hat?
85. **Aufgabe:** Bitte Claude um eine Idee für einen MCP Server, der beim täglichen Programmieren hilft. **Hinweis:** Z.B. ein Linter-Server.
86. **Aufgabe:** Lass dir erklären, wie ein MCP Server helfen könnte, mit einer lokalen Datenbank zu interagieren. **Hinweis:** Ohne den Code selbst zu sehen.
87. **Aufgabe:** Frage Claude, ob ein MCP Server auch das Internet durchsuchen könnte und wie das konzeptionell funktioniert. **Hinweis:** Ein Web-Search-Tool.
88. **Aufgabe:** Bitte Claude zu skizzieren, wie man einen einfachen MCP Server für das Lesen von PDF-Dateien konzipiert. **Hinweis:** Was muss das Tool können?
89. **Aufgabe:** Lass Claude erklären, wie er entscheidet, wann er ein Tool eines MCP Servers nutzt. **Hinweis:** Wie versteht er die Tool-Beschreibung?
90. **Aufgabe:** Fordere Claude auf, die Vorteile eines lokalen MCP Servers gegenüber einer reinen Cloud-Lösung zu nennen. **Hinweis:** Stichwort: Datenschutz.
91. **Aufgabe:** Bitte Claude um ein Konzept für einen MCP Server, der Git-Branches analysiert. **Hinweis:** Welche Informationen wären nützlich?
92. **Aufgabe:** Lass dir erklären, wie ein MCP Server dabei helfen kann, Code über mehrere Repositories hinweg zu durchsuchen. **Hinweis:** Zentraler Such-Index.
93. **Aufgabe:** Frage Claude nach Möglichkeiten, wie ein MCP Server Systemmetriken (CPU/RAM) überwachen könnte. **Hinweis:** Wozu könnte die KI diese Daten nutzen?
94. **Aufgabe:** Bitte Claude zu beschreiben, wie man Fehler ("Errors") von einem MCP Server am besten an die KI zurückmeldet. **Hinweis:** Damit sie es versteht und korrigieren kann.
95. **Aufgabe:** Lass Claude skizzieren, wie ein MCP Server zur Steuerung von Smart-Home-Geräten aussehen könnte. **Hinweis:** IOT-Integration.
96. **Aufgabe:** Fordere Claude auf, zu erklären, wie Rate-Limiting bei einem MCP Server konzeptionell umgesetzt wird. **Hinweis:** Um Spam zu vermeiden.
97. **Aufgabe:** Bitte Claude um Ideen, wie ein MCP Server helfen könnte, lokale Bilder zu kategorisieren. **Hinweis:** Metadaten-Extraktion.
98. **Aufgabe:** Lass dir erklären, wie ein MCP Server als Übersetzer zwischen der KI und einer sehr alten (Legacy) API fungieren kann. **Hinweis:** Adapter-Pattern.
99. **Aufgabe:** Frage Claude, wie man sicherstellt, dass ein MCP Server nicht versehentlich wichtige Dateien löscht. **Hinweis:** Read-only Modus.
100. **Aufgabe:** Bitte Claude, dir eine Checkliste für die Planung deines ersten eigenen MCP Servers zu erstellen. **Hinweis:** Was musst du vorher klären?
