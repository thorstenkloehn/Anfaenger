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

## 📜 100+ Projektvorschläge

### ❌ Error Handling (thiserror & anyhow)
1. 🌦️ **CLI-Wetter-Tool** (nur die wichtigsten 10 Themen)
2. 🧾 **Rechnungs-Validator** (nur die wichtigsten 10 Themen)
3. 📦 **Bestellsystem-Fehlerkette** (nur die wichtigsten 10 Themen)
4. 🧮 **Config-Parser mit Fehlerkontext** (nur die wichtigsten 10 Themen)
5. 🔌 **Plugin-Loader mit Fehlerbehandlung** (nur die wichtigsten 10 Themen)
6. 🗄️ **Datei-Import-Pipeline** (nur die wichtigsten 10 Themen)
7. 🌐 **HTTP-Client-Wrapper** (nur die wichtigsten 10 Themen)
8. 🧪 **Fehler-Testsuite** (nur die wichtigsten 10 Themen)

### ⚙️ Config & Serialisierung (serde)
9. 📋 **Multi-Format-Config-Loader** (nur die wichtigsten 10 Themen)
10. 🗃️ **Kontakt-Export/Import** (nur die wichtigsten 10 Themen)
11. 🎮 **Spielstand-Speicherung** (nur die wichtigsten 10 Themen)
12. 🌐 **API-Response-Mapper** (nur die wichtigsten 10 Themen)
13. 🧾 **Rechnungsvorlagen als YAML** (nur die wichtigsten 10 Themen)
14. 🔄 **Schema-Migrations-Tool** (nur die wichtigsten 10 Themen)
15. 📊 **CSV-zu-JSON-Konverter** (nur die wichtigsten 10 Themen)
16. 🧩 **Custom-Serialize-Implementierung** (nur die wichtigsten 10 Themen)

### 🖥️ CLI (clap)
17. 🌦️ **Wetter-CLI mit Subcommands** (nur die wichtigsten 10 Themen)
18. 🗂️ **Datei-Organizer-CLI** (nur die wichtigsten 10 Themen)
19. 🧮 **Rechner-CLI mit Flags** (nur die wichtigsten 10 Themen)
20. 📋 **To-Do-CLI** (nur die wichtigsten 10 Themen)
21. 🔍 **Grep-Klon (einfach)** (nur die wichtigsten 10 Themen)
22. 📦 **Backup-CLI** (nur die wichtigsten 10 Themen)
23. 🌐 **API-Client-CLI** (nur die wichtigsten 10 Themen)
24. 🧾 **Rechnungs-Generator-CLI** (nur die wichtigsten 10 Themen)

### 📝 Tracing
25. 🌦️ **Instrumentiertes Wetter-Tool** (nur die wichtigsten 10 Themen)
26. 🔍 **Request-Verfolgung (simuliert)** (nur die wichtigsten 10 Themen)
27. 🧵 **Nebenläufige Aufgaben mit Tracing** (nur die wichtigsten 10 Themen)
28. 📊 **Strukturierte Log-Pipeline** (nur die wichtigsten 10 Themen)
29. 🧯 **Fehler-Tracing** (nur die wichtigsten 10 Themen)
30. 🌐 **Instrumentierter HTTP-Client** (nur die wichtigsten 10 Themen)

### ⏳ Async/Await & Tokio
31. ⬇️ **Paralleler Datei-Downloader** (nur die wichtigsten 10 Themen)
32. ⏱️ **Async-Timer-Kaskade** (nur die wichtigsten 10 Themen)
33. 🌐 **Async-HTTP-Client-Batch** (nur die wichtigsten 10 Themen)
34. 📬 **Async-Task-Queue** (nur die wichtigsten 10 Themen)
35. 🧮 **Async-Berechnungspipeline** (nur die wichtigsten 10 Themen)
36. 🗃️ **Async-Datei-Batch-Verarbeitung** (nur die wichtigsten 10 Themen)
37. ⏳ **Timeout-Handling mit Tokio** (nur die wichtigsten 10 Themen)
38. 🌦️ **Async-Wetter-Aggregator** (nur die wichtigsten 10 Themen)

### 🔀 Concurrency (`Arc<Mutex<T>>`, Channels)
39. 💬 **Chat-Server (TCP)** (nur die wichtigsten 10 Themen)
40. 📈 **Metrics-Aggregator-Service** (nur die wichtigsten 10 Themen)
41. 🧵 **Geteilter Zähler (threadsicher)** (nur die wichtigsten 10 Themen)
42. 🏭 **Producer-Consumer-Pipeline** (nur die wichtigsten 10 Themen)
43. 🗳️ **Paralleler Abstimmungs-Zähler** (nur die wichtigsten 10 Themen)
44. 🌐 **Verteilter Cache (simuliert)** (nur die wichtigsten 10 Themen)
45. 🧮 **Paralleler Datenaggregator** (nur die wichtigsten 10 Themen)
46. 🚦 **Worker-Pool mit Channels** (nur die wichtigsten 10 Themen)

### 🌐 REST API, DB & Docker
47. 🌐 **REST-API Todo-Service** (nur die wichtigsten 10 Themen)
48. 📚 **Bibliotheks-API** (nur die wichtigsten 10 Themen)
49. 🧾 **Rechnungs-API** (nur die wichtigsten 10 Themen)
50. 🎮 **Highscore-API** (nur die wichtigsten 10 Themen)
51. 🗳️ **Umfrage-API** (nur die wichtigsten 10 Themen)
52. 🧑‍🤝‍🧑 **Nutzerverwaltungs-API** (nur die wichtigsten 10 Themen)
53. 📦 **Lagerbestand-API** (nur die wichtigsten 10 Themen)
54. 🌦️ **Wetter-Cache-API** (nur die wichtigsten 10 Themen)

### 🔒 Security-Grundlagen
55. 🔐 **Sicherer Passwort-Manager (CLI)** (nur die wichtigsten 10 Themen)
56. 🧼 **Eingabe-Validierungs-Bibliothek** (nur die wichtigsten 10 Themen)
57. 🗝️ **Secrets-Loader** (nur die wichtigsten 10 Themen)
58. 🧯 **Sensible-Daten-Logger-Filter** (nur die wichtigsten 10 Themen)
59. 🔒 **Verschlüsselter Notiz-Tresor** (nur die wichtigsten 10 Themen)
60. 🧾 **API-Key-Verwaltung** (nur die wichtigsten 10 Themen)
61. 🧪 **Fuzz-artige Eingabe-Härtungstests** (nur die wichtigsten 10 Themen)

### 🧩 Kombinierte Profi-Projekte
62. 🌦️ **Produktionsreifes Wetter-CLI** (nur die wichtigsten 10 Themen)
63. 🌐 **Containerisierter Todo-Service** (nur die wichtigsten 10 Themen)
64. 🔐 **Sicherer Multi-User-Passwort-Tresor-Server** (nur die wichtigsten 10 Themen)
65. 💬 **Instrumentierter Chat-Server** (nur die wichtigsten 10 Themen)
66. 📈 **Metrics-Service mit DB-Persistenz** (nur die wichtigsten 10 Themen)
67. ⬇️ **Download-Manager mit CLI & Tracing** (nur die wichtigsten 10 Themen)
68. 🧾 **Rechnungs-Microservice** (nur die wichtigsten 10 Themen)
69. 🌐 **API-Gateway (vereinfacht)** (nur die wichtigsten 10 Themen)
70. 🔒 **Security-gehärtete Config-API** (nur die wichtigsten 10 Themen)
71. 📊 **Verteiltes Aggregations-System** (nur die wichtigsten 10 Themen)
72. 🧮 **Batch-Import-Service** (nur die wichtigsten 10 Themen)
73. 🎮 **Highscore-Plattform komplett** (nur die wichtigsten 10 Themen)
74. 🗳️ **Abstimmungs-Plattform** (nur die wichtigsten 10 Themen)
75. 🌦️ **Multi-Quellen-Wetteraggregator-Service** (nur die wichtigsten 10 Themen)
76. 📦 **Bestellsystem-Backend** (nur die wichtigsten 10 Themen)
77. 🔐 **Auth-Service (Lernprojekt)** (nur die wichtigsten 10 Themen)
78. 🧾 **Abo-Verwaltungs-API** (nur die wichtigsten 10 Themen)
79. 🌐 **Health-Check-Aggregator** (nur die wichtigsten 10 Themen)
80. 🧑‍🤝‍🧑 **Team-Kollaborationstool (Backend)** (nur die wichtigsten 10 Themen)

### 🔁 Erweiterte Praxisprojekte
81. 🌦️ **Wetter-Alarm-Dienst** (nur die wichtigsten 10 Themen)
82. 📬 **E-Mail-Warteschlangen-Simulator** (nur die wichtigsten 10 Themen)
83. 🧮 **Verteilter Taschenrechner-Service** (nur die wichtigsten 10 Themen)
84. 🗃️ **Datei-Sync-Tool (CLI)** (nur die wichtigsten 10 Themen)
85. 🎫 **Ticket-System-Backend** (nur die wichtigsten 10 Themen)
86. 🧾 **Abrechnungs-Batch-Job** (nur die wichtigsten 10 Themen)
87. 🔒 **Rate-Limiter-Middleware** (nur die wichtigsten 10 Themen)
88. 🌐 **Reverse-Proxy (vereinfacht)** (nur die wichtigsten 10 Themen)
89. 📊 **Dashboard-Backend** (nur die wichtigsten 10 Themen)
90. 🧩 **Feature-Flag-Service** (nur die wichtigsten 10 Themen)
91. 🔐 **Passwort-Rotation-Reminder** (nur die wichtigsten 10 Themen)
92. 🧵 **Paralleler Datei-Hasher** (nur die wichtigsten 10 Themen)
93. 🌦️ **Wetterstation-Datensammler** (nur die wichtigsten 10 Themen)
94. 📦 **Inventar-Sync-Service** (nur die wichtigsten 10 Themen)
95. 🧾 **Mahnwesen-Automatisierung** (nur die wichtigsten 10 Themen)
96. 🔒 **Geheimnis-Rotations-CLI** (nur die wichtigsten 10 Themen)
97. 🌐 **Webhook-Empfänger** (nur die wichtigsten 10 Themen)
98. 🧮 **Batch-Preisrechner-Service** (nur die wichtigsten 10 Themen)
99. 📈 **SLA-Monitoring-Tool** (nur die wichtigsten 10 Themen)
100. 🔐 **Zero-Trust-Config-Validator** (nur die wichtigsten 10 Themen)
101. 🧾 **Multi-Mandanten-Rechnungs-API** (nur die wichtigsten 10 Themen)
102. 🌦️ **Resilientes Wetter-Gateway** (nur die wichtigsten 10 Themen)

### 💼 Praxisnahe Business- & Firmenprojekte
103. 👥 **HR-Datenservice (Backend)** (nur die wichtigsten 10 Themen)
104. 📦 **Bestandsverwaltungs-Backend** (nur die wichtigsten 10 Themen)
105. 🛒 **Bestellabwicklungs-Service** (nur die wichtigsten 10 Themen)
106. 📧 **Benachrichtigungs-Gateway (E-Mail/SMS abstrahiert)** (nur die wichtigsten 10 Themen)
107. 📜 **Audit-Log-Service** (nur die wichtigsten 10 Themen)
108. 🔐 **Auth- & Session-Service** (nur die wichtigsten 10 Themen)
109. 🚪 **API-Gateway mit Rate-Limiting** (nur die wichtigsten 10 Themen)
110. 🗂️ **Hintergrund-Job-Queue-Prozessor** (nur die wichtigsten 10 Themen)
111. 🔄 **ETL-Pipeline für Geschäftsdaten** (nur die wichtigsten 10 Themen)
112. 📈 **Monitoring- & Alerting-Service** (nur die wichtigsten 10 Themen)
113. 🚩 **Feature-Flag-Service (Backend)** (nur die wichtigsten 10 Themen)
114. 🔗 **Webhook-Zustell-Service** (nur die wichtigsten 10 Themen)
115. 💳 **Zahlungs-Webhook-Handler (simuliert)** (nur die wichtigsten 10 Themen)
116. 🧑‍💼 **CRM-Backend** (nur die wichtigsten 10 Themen)
117. 🎫 **Ticketing-System-Backend** (nur die wichtigsten 10 Themen)
118. ⚙️ **Config-Management-Service** (nur die wichtigsten 10 Themen)
119. 🔑 **Secrets-Rotations-Service** (nur die wichtigsten 10 Themen)
120. 🛡️ **Compliance-Scan-Service** (nur die wichtigsten 10 Themen)
