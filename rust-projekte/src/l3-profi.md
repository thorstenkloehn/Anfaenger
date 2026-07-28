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
1. 🌦️ **CLI-Wetter-Tool** (15-20 Lektionen)
2. 🧾 **Rechnungs-Validator** (15-20 Lektionen)
3. 📦 **Bestellsystem-Fehlerkette** (15-20 Lektionen)
4. 🧮 **Config-Parser mit Fehlerkontext** (15-20 Lektionen)
5. 🔌 **Plugin-Loader mit Fehlerbehandlung** (15-20 Lektionen)
6. 🗄️ **Datei-Import-Pipeline** (15-20 Lektionen)
7. 🌐 **HTTP-Client-Wrapper** (15-20 Lektionen)
8. 🧪 **Fehler-Testsuite** (15-20 Lektionen)

### ⚙️ Config & Serialisierung (serde)
9. 📋 **Multi-Format-Config-Loader** (15-20 Lektionen)
10. 🗃️ **Kontakt-Export/Import** (15-20 Lektionen)
11. 🎮 **Spielstand-Speicherung** (15-20 Lektionen)
12. 🌐 **API-Response-Mapper** (15-20 Lektionen)
13. 🧾 **Rechnungsvorlagen als YAML** (15-20 Lektionen)
14. 🔄 **Schema-Migrations-Tool** (15-20 Lektionen)
15. 📊 **CSV-zu-JSON-Konverter** (15-20 Lektionen)
16. 🧩 **Custom-Serialize-Implementierung** (15-20 Lektionen)

### 🖥️ CLI (clap)
17. 🌦️ **Wetter-CLI mit Subcommands** (15-20 Lektionen)
18. 🗂️ **Datei-Organizer-CLI** (15-20 Lektionen)
19. 🧮 **Rechner-CLI mit Flags** (15-20 Lektionen)
20. 📋 **To-Do-CLI** (15-20 Lektionen)
21. 🔍 **Grep-Klon (einfach)** (15-20 Lektionen)
22. 📦 **Backup-CLI** (15-20 Lektionen)
23. 🌐 **API-Client-CLI** (15-20 Lektionen)
24. 🧾 **Rechnungs-Generator-CLI** (15-20 Lektionen)

### 📝 Tracing
25. 🌦️ **Instrumentiertes Wetter-Tool** (15-20 Lektionen)
26. 🔍 **Request-Verfolgung (simuliert)** (15-20 Lektionen)
27. 🧵 **Nebenläufige Aufgaben mit Tracing** (15-20 Lektionen)
28. 📊 **Strukturierte Log-Pipeline** (15-20 Lektionen)
29. 🧯 **Fehler-Tracing** (15-20 Lektionen)
30. 🌐 **Instrumentierter HTTP-Client** (15-20 Lektionen)

### ⏳ Async/Await & Tokio
31. ⬇️ **Paralleler Datei-Downloader** (15-20 Lektionen)
32. ⏱️ **Async-Timer-Kaskade** (15-20 Lektionen)
33. 🌐 **Async-HTTP-Client-Batch** (15-20 Lektionen)
34. 📬 **Async-Task-Queue** (15-20 Lektionen)
35. 🧮 **Async-Berechnungspipeline** (15-20 Lektionen)
36. 🗃️ **Async-Datei-Batch-Verarbeitung** (15-20 Lektionen)
37. ⏳ **Timeout-Handling mit Tokio** (15-20 Lektionen)
38. 🌦️ **Async-Wetter-Aggregator** (15-20 Lektionen)

### 🔀 Concurrency (`Arc<Mutex<T>>`, Channels)
39. 💬 **Chat-Server (TCP)** (15-20 Lektionen)
40. 📈 **Metrics-Aggregator-Service** (15-20 Lektionen)
41. 🧵 **Geteilter Zähler (threadsicher)** (15-20 Lektionen)
42. 🏭 **Producer-Consumer-Pipeline** (15-20 Lektionen)
43. 🗳️ **Paralleler Abstimmungs-Zähler** (15-20 Lektionen)
44. 🌐 **Verteilter Cache (simuliert)** (15-20 Lektionen)
45. 🧮 **Paralleler Datenaggregator** (15-20 Lektionen)
46. 🚦 **Worker-Pool mit Channels** (15-20 Lektionen)

### 🌐 REST API, DB & Docker
47. 🌐 **REST-API Todo-Service** (15-20 Lektionen)
48. 📚 **Bibliotheks-API** (15-20 Lektionen)
49. 🧾 **Rechnungs-API** (15-20 Lektionen)
50. 🎮 **Highscore-API** (15-20 Lektionen)
51. 🗳️ **Umfrage-API** (15-20 Lektionen)
52. 🧑‍🤝‍🧑 **Nutzerverwaltungs-API** (15-20 Lektionen)
53. 📦 **Lagerbestand-API** (15-20 Lektionen)
54. 🌦️ **Wetter-Cache-API** (15-20 Lektionen)

### 🔒 Security-Grundlagen
55. 🔐 **Sicherer Passwort-Manager (CLI)** (15-20 Lektionen)
56. 🧼 **Eingabe-Validierungs-Bibliothek** (15-20 Lektionen)
57. 🗝️ **Secrets-Loader** (15-20 Lektionen)
58. 🧯 **Sensible-Daten-Logger-Filter** (15-20 Lektionen)
59. 🔒 **Verschlüsselter Notiz-Tresor** (15-20 Lektionen)
60. 🧾 **API-Key-Verwaltung** (15-20 Lektionen)
61. 🧪 **Fuzz-artige Eingabe-Härtungstests** (15-20 Lektionen)

### 🧩 Kombinierte Profi-Projekte
62. 🌦️ **Produktionsreifes Wetter-CLI** (15-20 Lektionen)
63. 🌐 **Containerisierter Todo-Service** (15-20 Lektionen)
64. 🔐 **Sicherer Multi-User-Passwort-Tresor-Server** (15-20 Lektionen)
65. 💬 **Instrumentierter Chat-Server** (15-20 Lektionen)
66. 📈 **Metrics-Service mit DB-Persistenz** (15-20 Lektionen)
67. ⬇️ **Download-Manager mit CLI & Tracing** (15-20 Lektionen)
68. 🧾 **Rechnungs-Microservice** (15-20 Lektionen)
69. 🌐 **API-Gateway (vereinfacht)** (15-20 Lektionen)
70. 🔒 **Security-gehärtete Config-API** (15-20 Lektionen)
71. 📊 **Verteiltes Aggregations-System** (15-20 Lektionen)
72. 🧮 **Batch-Import-Service** (15-20 Lektionen)
73. 🎮 **Highscore-Plattform komplett** (15-20 Lektionen)
74. 🗳️ **Abstimmungs-Plattform** (15-20 Lektionen)
75. 🌦️ **Multi-Quellen-Wetteraggregator-Service** (15-20 Lektionen)
76. 📦 **Bestellsystem-Backend** (15-20 Lektionen)
77. 🔐 **Auth-Service (Lernprojekt)** (15-20 Lektionen)
78. 🧾 **Abo-Verwaltungs-API** (15-20 Lektionen)
79. 🌐 **Health-Check-Aggregator** (15-20 Lektionen)
80. 🧑‍🤝‍🧑 **Team-Kollaborationstool (Backend)** (15-20 Lektionen)

### 🔁 Erweiterte Praxisprojekte
81. 🌦️ **Wetter-Alarm-Dienst** (15-20 Lektionen)
82. 📬 **E-Mail-Warteschlangen-Simulator** (15-20 Lektionen)
83. 🧮 **Verteilter Taschenrechner-Service** (15-20 Lektionen)
84. 🗃️ **Datei-Sync-Tool (CLI)** (15-20 Lektionen)
85. 🎫 **Ticket-System-Backend** (15-20 Lektionen)
86. 🧾 **Abrechnungs-Batch-Job** (15-20 Lektionen)
87. 🔒 **Rate-Limiter-Middleware** (15-20 Lektionen)
88. 🌐 **Reverse-Proxy (vereinfacht)** (15-20 Lektionen)
89. 📊 **Dashboard-Backend** (15-20 Lektionen)
90. 🧩 **Feature-Flag-Service** (15-20 Lektionen)
91. 🔐 **Passwort-Rotation-Reminder** (15-20 Lektionen)
92. 🧵 **Paralleler Datei-Hasher** (15-20 Lektionen)
93. 🌦️ **Wetterstation-Datensammler** (15-20 Lektionen)
94. 📦 **Inventar-Sync-Service** (15-20 Lektionen)
95. 🧾 **Mahnwesen-Automatisierung** (15-20 Lektionen)
96. 🔒 **Geheimnis-Rotations-CLI** (15-20 Lektionen)
97. 🌐 **Webhook-Empfänger** (15-20 Lektionen)
98. 🧮 **Batch-Preisrechner-Service** (15-20 Lektionen)
99. 📈 **SLA-Monitoring-Tool** (15-20 Lektionen)
100. 🔐 **Zero-Trust-Config-Validator** (15-20 Lektionen)
101. 🧾 **Multi-Mandanten-Rechnungs-API** (15-20 Lektionen)
102. 🌦️ **Resilientes Wetter-Gateway** (15-20 Lektionen)

### 💼 Praxisnahe Business- & Firmenprojekte
103. 👥 **HR-Datenservice (Backend)** (15-20 Lektionen)
104. 📦 **Bestandsverwaltungs-Backend** (15-20 Lektionen)
105. 🛒 **Bestellabwicklungs-Service** (15-20 Lektionen)
106. 📧 **Benachrichtigungs-Gateway (E-Mail/SMS abstrahiert)** (15-20 Lektionen)
107. 📜 **Audit-Log-Service** (15-20 Lektionen)
108. 🔐 **Auth- & Session-Service** (15-20 Lektionen)
109. 🚪 **API-Gateway mit Rate-Limiting** (15-20 Lektionen)
110. 🗂️ **Hintergrund-Job-Queue-Prozessor** (15-20 Lektionen)
111. 🔄 **ETL-Pipeline für Geschäftsdaten** (15-20 Lektionen)
112. 📈 **Monitoring- & Alerting-Service** (15-20 Lektionen)
113. 🚩 **Feature-Flag-Service (Backend)** (15-20 Lektionen)
114. 🔗 **Webhook-Zustell-Service** (15-20 Lektionen)
115. 💳 **Zahlungs-Webhook-Handler (simuliert)** (15-20 Lektionen)
116. 🧑‍💼 **CRM-Backend** (15-20 Lektionen)
117. 🎫 **Ticketing-System-Backend** (15-20 Lektionen)
118. ⚙️ **Config-Management-Service** (15-20 Lektionen)
119. 🔑 **Secrets-Rotations-Service** (15-20 Lektionen)
120. 🛡️ **Compliance-Scan-Service** (15-20 Lektionen)
