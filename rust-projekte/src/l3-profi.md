# 🟠 L3 Profi

Jetzt geht es um Rust im echten Betrieb: robuste Fehlerbehandlung, Konfiguration, CLIs, Nebenläufigkeit, Web-APIs und Security-Grundlagen — der Werkzeugkasten für produktionsreife Software.

| Thema | Was du lernst |
|---|---|
| ❌ Error Handling | `thiserror` für Bibliotheken, `anyhow` für Anwendungen |
| ⚙️ Config & Serialisierung | `serde` (Serialize/Deserialize), JSON/TOML/YAML |
| 🖥️ CLI | `clap` (Derive-API, Subcommands, Argumente) |
| 📝 Tracing | `tracing`, strukturierte Logs, Spans |
| ⏳ Async/Await & Tokio | `async fn`, `.await`, die Tokio-Runtime |
| 🔀 Concurrency | `Arc<Mutex<T>>`, Channels (`mpsc`) |
| 🌐 REST API & DB & Docker | `axum`, `sqlx`, Containerisierung |
| 🔒 Security-Grundlagen | Input-Validation, Secrets-Handling, `zeroize` |

> **Hinweis:** Alle Projekte werden ohne fertige Code-Vorschläge begleitet. Erarbeite die Lösung eigenständig!

---

## 📜 132 Projektvorschläge

### 🧠 Wissenssysteme & Wissenstechnik
1. 🌐 **REST-API für Wissensdatenbank (axum + sqlx)** (nur die wichtigsten 10 Themen)
2. 🔍 **Volltextsuche-Service mit Tracing** (nur die wichtigsten 10 Themen)
3. 🕷️ **Async-Wissens-Crawler (parallele Quellen)** (nur die wichtigsten 10 Themen)
4. 🖥️ **Wissensmanagement-CLI (clap, Subcommands)** (nur die wichtigsten 10 Themen)
5. 🔄 **Wissens-Ingestion-Pipeline (async, Fehlerkontext)** (nur die wichtigsten 10 Themen)
6. 🏷️ **Tag-Such-Microservice** (nur die wichtigsten 10 Themen)
7. 📓 **Wiki-Engine mit Markdown-Rendering & DB** (nur die wichtigsten 10 Themen)
8. 💬 **Chatbot-Backend mit Wissensbasis-Lookup** (nur die wichtigsten 10 Themen)
9. 🔒 **Sicherer Wissens-Tresor (Secrets-Handling)** (nur die wichtigsten 10 Themen)
10. ⚙️ **Konfigurierbarer Ontologie-Service (serde)** (nur die wichtigsten 10 Themen)
11. 🎴 **Karteikarten-Sync-Server (Concurrency)** (nur die wichtigsten 10 Themen)
12. 📈 **Wissens-Analytics-Dashboard-Backend** (nur die wichtigsten 10 Themen)

### 🧭 Expertensysteme & Expertensystem-Technik
13. 🌐 **REST-API für Regel-Engine (axum)** (nur die wichtigsten 10 Themen)
14. 🖥️ **CLI für Wissensbasis-Pflege (clap)** (nur die wichtigsten 10 Themen)
15. 🩺 **Async-Diagnose-Service** (nur die wichtigsten 10 Themen)
16. ⚙️ **Regel-Editor mit Config (serde, TOML/YAML)** (nur die wichtigsten 10 Themen)
17. 📝 **Tracing-instrumentierte Inferenz-Engine** (nur die wichtigsten 10 Themen)
18. 🔀 **Concurrency-fähige Diagnose-Pipeline (parallele Anfragen)** (nur die wichtigsten 10 Themen)
19. 🔒 **Sicherer Regelwerk-Speicher (Security-Grundlagen)** (nur die wichtigsten 10 Themen)
20. 🎧 **Expertensystem-Backend für Kundensupport** (nur die wichtigsten 10 Themen)
21. 📜 **Regel-Versionierung & Audit-Service** (nur die wichtigsten 10 Themen)
22. 🐳 **Docker-containerisierte Diagnose-API** (nur die wichtigsten 10 Themen)
23. 🌐 **Multi-Domain-Expertensystem-Gateway** (nur die wichtigsten 10 Themen)
24. 🔍 **Explainable-Trace-Service (Begründungspfad ausgeben)** (nur die wichtigsten 10 Themen)

### 🎓 LMS & Lernplattform-Technik
25. 🌐 **REST-API für Kursverwaltung (axum + sqlx)** (nur die wichtigsten 10 Themen)
26. 🖥️ **CLI für LMS-Administration (clap)** (nur die wichtigsten 10 Themen)
27. ⬆️ **Async-Video-Upload-Pipeline** (nur die wichtigsten 10 Themen)
28. 📝 **Quiz-Auswertungs-Service mit Tracing** (nur die wichtigsten 10 Themen)
29. 🔐 **Nutzer-Auth- & Rollen-Service (Security-Grundlagen)** (nur die wichtigsten 10 Themen)
30. 🔀 **Fortschritts-Sync-Service (Concurrency)** (nur die wichtigsten 10 Themen)
31. 🏅 **Zertifikats-PDF-Service (simuliert)** (nur die wichtigsten 10 Themen)
32. 🐳 **Docker-containerisiertes LMS-Backend** (nur die wichtigsten 10 Themen)
33. 🔔 **Benachrichtigungs-Service (Kursupdates)** (nur die wichtigsten 10 Themen)
34. ⚙️ **Config-gesteuerte Kurs-Import-Pipeline (serde)** (nur die wichtigsten 10 Themen)
35. 🏫 **Multi-Mandanten-LMS-API (mehrere Schulen)** (nur die wichtigsten 10 Themen)
36. 📊 **Lernanalytics-Dashboard-Backend** (nur die wichtigsten 10 Themen)

### 🤖 Eigener KI-Agent & Agenten-Technik
37. 🌐 **REST-API für Agenten-Steuerung (axum)** (nur die wichtigsten 10 Themen)
38. 🖥️ **CLI für eigenen KI-Agenten (clap)** (nur die wichtigsten 10 Themen)
39. ⚙️ **Async-Tool-Ausführungs-Pipeline** (nur die wichtigsten 10 Themen)
40. 📝 **Tracing-instrumentierter Agenten-Loop** (nur die wichtigsten 10 Themen)
41. 🔐 **Sicherer API-Key-Handler für LLM-Anfragen** (nur die wichtigsten 10 Themen)
42. 🔀 **Concurrency-fähiger Multi-Agenten-Koordinator** (nur die wichtigsten 10 Themen)
43. 🌐 **HTTP-Client-Wrapper für LLM-APIs (async)** (nur die wichtigsten 10 Themen)
44. ⚙️ **Config-gesteuerte Agenten-Persona (serde)** (nur die wichtigsten 10 Themen)
45. 🐳 **Docker-containerisierter Agenten-Service** (nur die wichtigsten 10 Themen)
46. 📬 **Event-Queue für Agenten-Nachrichten (Channels)** (nur die wichtigsten 10 Themen)
47. 🚦 **Rate-Limiter für LLM-Anfragen** (nur die wichtigsten 10 Themen)
48. 🚌 **Multi-Agenten-Message-Bus-Service** (nur die wichtigsten 10 Themen)
49. 📡 **Streaming-Antwort-Service (async, simulierte Events)** (nur die wichtigsten 10 Themen)
50. 🗄️ **Agenten-Gedächtnis-Persistenz-Service (DB via sqlx)** (nur die wichtigsten 10 Themen)
51. 🧰 **Werkzeug-Registry-API (Tools dynamisch registrieren)** (nur die wichtigsten 10 Themen)
52. 🔒 **Sandboxed-Tool-Ausführung (Security-Grundlagen)** (nur die wichtigsten 10 Themen)
53. 💓 **Agenten-Health-Check- & Monitoring-Service** (nur die wichtigsten 10 Themen)
54. 💰 **Kosten-Tracking-Service für LLM-Aufrufe (Token-Zählung)** (nur die wichtigsten 10 Themen)
55. 🏢 **Multi-Tenant-Agenten-Plattform-Backend** (nur die wichtigsten 10 Themen)
56. 🔗 **Webhook-Empfänger für externe Agenten-Trigger** (nur die wichtigsten 10 Themen)
57. 📥 **Async-Dokumenten-Ingestion für Kontext (RAG-Vorstufe)** (nur die wichtigsten 10 Themen)
58. 🗂️ **Agenten-Konfigurationsverwaltung mit Versionierung** (nur die wichtigsten 10 Themen)
59. ⏳ **Fehler-Wiederholungs-Service mit Backoff (Tool-Fehler)** (nur die wichtigsten 10 Themen)
60. 🐳 **Containerisierte Multi-Agenten-Orchestrierung (Docker Compose)** (nur die wichtigsten 10 Themen)

### 📖 LLM-Wiki-Pattern (Karpathy-Muster) & Wiki-Technik
61. 🌐 **REST-API für Wiki-Backend (axum + sqlx)** (nur die wichtigsten 10 Themen)
62. 🖥️ **CLI für Wiki-Pflege (clap)** (nur die wichtigsten 10 Themen)
63. ⚙️ **Async-Content-Generierungs-Pipeline (simulierte LLM-Aufrufe)** (nur die wichtigsten 10 Themen)
64. 📝 **Tracing-instrumentierter Review-Workflow** (nur die wichtigsten 10 Themen)
65. 🔐 **Sicherer Editor-Zugriff (Auth, Security-Grundlagen)** (nur die wichtigsten 10 Themen)
66. 🔀 **Concurrency-fähige Merge-Queue (parallele Edits)** (nur die wichtigsten 10 Themen)
67. ⚙️ **Config-gesteuerte Publishing-Pipeline (serde)** (nur die wichtigsten 10 Themen)
68. 🐳 **Docker-containerisierter Wiki-Service** (nur die wichtigsten 10 Themen)
69. 🔔 **Webhook-Benachrichtigung bei Artikel-Änderungen** (nur die wichtigsten 10 Themen)
70. 🔍 **Diff-Service als Microservice** (nur die wichtigsten 10 Themen)
71. 🧑‍🤝‍🧑 **Multi-Autoren-Kollaborations-Backend** (nur die wichtigsten 10 Themen)
72. 📜 **Audit-Log-Service für Wiki-Änderungen** (nur die wichtigsten 10 Themen)

### 🔍 RAG & Vektorsuche
73. 🌐 **REST-API für Vektorsuche (axum + sqlx)** (nur die wichtigsten 10 Themen)
74. 🖥️ **CLI für Dokumenten-Ingestion (clap)** (nur die wichtigsten 10 Themen)
75. ⚙️ **Async-Embedding-Pipeline (parallele Dokumentenverarbeitung)** (nur die wichtigsten 10 Themen)
76. 📝 **Tracing-instrumentierte RAG-Query-Pipeline** (nur die wichtigsten 10 Themen)
77. 🔐 **Sicherer Dokumenten-Zugriff (Zugriffsrechte)** (nur die wichtigsten 10 Themen)
78. 🔀 **Concurrency-fähiger Index-Aktualisierungs-Service** (nur die wichtigsten 10 Themen)
79. ⚙️ **Config-gesteuerte Retrieval-Strategie (Top-K, Schwellenwert)** (nur die wichtigsten 10 Themen)
80. 🐳 **Docker-containerisierter RAG-Service** (nur die wichtigsten 10 Themen)
81. 📦 **Batch-Import-Service für große Dokumentenmengen** (nur die wichtigsten 10 Themen)
82. 🔍 **Hybrid-Such-Service (Keyword + Vektor kombiniert)** (nur die wichtigsten 10 Themen)
83. 🗂️ **Multi-Collection-Vektor-API (mehrere Wissensbasen)** (nur die wichtigsten 10 Themen)
84. 📈 **Monitoring-Service für Retrieval-Qualität (Trefferquote)** (nur die wichtigsten 10 Themen)

### 🔌 MCP (Model Context Protocol) & Tool-Technik
85. ⚙️ **Async-MCP-Server über stdio (Tokio)** (nur die wichtigsten 10 Themen)
86. 🌐 **REST/SSE-basierter MCP-Server (axum)** (nur die wichtigsten 10 Themen)
87. 🖥️ **CLI für MCP-Server-Verwaltung (clap)** (nur die wichtigsten 10 Themen)
88. 📝 **Tracing-instrumentierter Tool-Aufruf-Fluss** (nur die wichtigsten 10 Themen)
89. 🔐 **Sicherer Zugriffskontroll-Layer für Tools** (nur die wichtigsten 10 Themen)
90. 🔀 **Concurrency-fähiger Multi-Client-Server** (nur die wichtigsten 10 Themen)
91. ⚙️ **Config-gesteuerte Tool-Freischaltung (Allow-/Denylist)** (nur die wichtigsten 10 Themen)
92. 🐳 **Docker-containerisierter MCP-Server** (nur die wichtigsten 10 Themen)
93. ⏳ **Retry/Backoff für Tool-Aufrufe über Netzwerk** (nur die wichtigsten 10 Themen)
94. 💓 **Health-Check- & Capability-Discovery-Service** (nur die wichtigsten 10 Themen)
95. 🏢 **Multi-Tenant-MCP-Gateway** (nur die wichtigsten 10 Themen)
96. 📜 **Audit-Log-Service für Tool-Aufrufe** (nur die wichtigsten 10 Themen)

### 🗄️ Datenbank-Technik
97. 🌐 **REST-API mit echter DB-Anbindung (axum + sqlx)** (nur die wichtigsten 10 Themen)
98. 🖥️ **CLI für Datenbank-Migrationen (clap)** (nur die wichtigsten 10 Themen)
99. ⚙️ **Async-Connection-Pool-Management** (nur die wichtigsten 10 Themen)
100. 📝 **Tracing-instrumentierte Query-Ausführung** (nur die wichtigsten 10 Themen)
101. 🔐 **Sicherer DB-Zugriff (SQL-Injection-Schutz)** (nur die wichtigsten 10 Themen)
102. 🔀 **Concurrency-fähiger Batch-Insert-Service** (nur die wichtigsten 10 Themen)
103. ⚙️ **Config-gesteuerte DB-Verbindung (mehrere Umgebungen)** (nur die wichtigsten 10 Themen)
104. 🐳 **Docker-containerisierte DB mit Migrations-Pipeline** (nur die wichtigsten 10 Themen)
105. 🔀 **Read-Replica-Routing-Simulator** (nur die wichtigsten 10 Themen)
106. 💽 **Backup- & Restore-Service (automatisiert)** (nur die wichtigsten 10 Themen)
107. 🏢 **Multi-Tenant-DB-Schema-Verwaltung** (nur die wichtigsten 10 Themen)
108. 📈 **Query-Performance-Monitoring-Service** (nur die wichtigsten 10 Themen)

### 🧮 Eigene Parser & Compiler bauen
109. 🖥️ **CLI für eigene Skriptsprache (clap)** (nur die wichtigsten 10 Themen)
110. 🧠 **Interpreter für einfache Skriptsprache (Variablen, Kontrollfluss)** (nur die wichtigsten 10 Themen)
111. ⚙️ **Async-Dateicompiler-Pipeline (parallele Dateiverarbeitung)** (nur die wichtigsten 10 Themen)
112. 📝 **Tracing-instrumentierter Compiler-Durchlauf (Lexen→Parsen→Auswerten)** (nur die wichtigsten 10 Themen)
113. 🔒 **Sicherer Sandbox-Interpreter (begrenzte Ausführung)** (nur die wichtigsten 10 Themen)
114. 🔀 **Concurrency-fähiger Batch-Compiler** (nur die wichtigsten 10 Themen)
115. ⚙️ **Config-gesteuerte Compiler-Optionen (serde)** (nur die wichtigsten 10 Themen)
116. 🐳 **Docker-containerisierter Compiler-Service** (nur die wichtigsten 10 Themen)
117. 🌐 **REST-API für Code-Ausführung („Playground“-Backend)** (nur die wichtigsten 10 Themen)
118. 🔍 **Semantische Analyse-Phase (einfache Typprüfung)** (nur die wichtigsten 10 Themen)
119. 🩺 **Fehlerdiagnose-Service mit Quellcode-Kontext** (nur die wichtigsten 10 Themen)
120. ⚙️ **Bytecode-Generator (einfache VM-Instruktionen)** (nur die wichtigsten 10 Themen)

### 📰 CMS-Technik
121. ⚙️ **Async-Content-API (axum, CRUD für Artikel)** (nur die wichtigsten 10 Themen)
122. 🐳 **Docker-containerisiertes Mini-CMS** (nur die wichtigsten 10 Themen)
123. 🔐 **Rollen-basierte Zugriffskontrolle (Autor/Redakteur/Admin)** (nur die wichtigsten 10 Themen)
124. 📝 **Tracing-instrumentierter Publishing-Workflow** (nur die wichtigsten 10 Themen)
125. ⚙️ **Config-gesteuertes CMS (serde, verschiedene Backends)** (nur die wichtigsten 10 Themen)
126. 💓 **Health-Check-Endpoint für CMS-Service** (nur die wichtigsten 10 Themen)
127. 🔄 **Asynchroner Medien-Upload-Dienst (Bilder, Dateien)** (nur die wichtigsten 10 Themen)
128. 🚦 **Rate-Limiting für Kommentar-API** (nur die wichtigsten 10 Themen)
129. 📈 **Cache-Invalidierungs-Dienst (Redis-artig, simuliert)** (nur die wichtigsten 10 Themen)
130. 🔃 **Content-Synchronisation zwischen Staging/Produktion** (nur die wichtigsten 10 Themen)
131. 🔎 **Async-Volltextsuche-Service (Index im Hintergrund aktualisieren)** (nur die wichtigsten 10 Themen)
132. 🌐 **Webhook-System (Event bei Veröffentlichung auslösen)** (nur die wichtigsten 10 Themen)
