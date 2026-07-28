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
1. 🌦️ **CLI-Wetter-Tool** (15-20 Lektionen) Miniprojekt
2. 🧾 **Rechnungs-Validator** (15-20 Lektionen) Miniprojekt
3. 📦 **Bestellsystem-Fehlerkette** (15-20 Lektionen) Miniprojekt
4. 🧮 **Config-Parser mit Fehlerkontext** (15-20 Lektionen) Miniprojekt
5. 🔌 **Plugin-Loader mit Fehlerbehandlung** (15-20 Lektionen) Miniprojekt
6. 🗄️ **Datei-Import-Pipeline** (15-20 Lektionen) Miniprojekt
7. 🌐 **HTTP-Client-Wrapper** (15-20 Lektionen) Miniprojekt
8. 🧪 **Fehler-Testsuite** (15-20 Lektionen) Miniprojekt

### ⚙️ Config & Serialisierung (serde)
9. 📋 **Multi-Format-Config-Loader** (15-20 Lektionen) Miniprojekt
10. 🗃️ **Kontakt-Export/Import** (15-20 Lektionen) Miniprojekt
11. 🎮 **Spielstand-Speicherung** (15-20 Lektionen) Miniprojekt
12. 🌐 **API-Response-Mapper** (15-20 Lektionen) Miniprojekt
13. 🧾 **Rechnungsvorlagen als YAML** (15-20 Lektionen) Miniprojekt
14. 🔄 **Schema-Migrations-Tool** (15-20 Lektionen) Miniprojekt
15. 📊 **CSV-zu-JSON-Konverter** (15-20 Lektionen) Miniprojekt
16. 🧩 **Custom-Serialize-Implementierung** (15-20 Lektionen) Miniprojekt

### 🖥️ CLI (clap)
17. 🌦️ **Wetter-CLI mit Subcommands** (15-20 Lektionen) Miniprojekt
18. 🗂️ **Datei-Organizer-CLI** (15-20 Lektionen) Miniprojekt
19. 🧮 **Rechner-CLI mit Flags** (15-20 Lektionen) Miniprojekt
20. 📋 **To-Do-CLI** (15-20 Lektionen) Miniprojekt
21. 🔍 **Grep-Klon (einfach)** (15-20 Lektionen) Miniprojekt
22. 📦 **Backup-CLI** (15-20 Lektionen) Miniprojekt
23. 🌐 **API-Client-CLI** (15-20 Lektionen) Miniprojekt
24. 🧾 **Rechnungs-Generator-CLI** (15-20 Lektionen) Miniprojekt

### 📝 Tracing
25. 🌦️ **Instrumentiertes Wetter-Tool** (15-20 Lektionen) Miniprojekt
26. 🔍 **Request-Verfolgung (simuliert)** (15-20 Lektionen) Miniprojekt
27. 🧵 **Nebenläufige Aufgaben mit Tracing** (15-20 Lektionen) Miniprojekt
28. 📊 **Strukturierte Log-Pipeline** (15-20 Lektionen) Miniprojekt
29. 🧯 **Fehler-Tracing** (15-20 Lektionen) Miniprojekt
30. 🌐 **Instrumentierter HTTP-Client** (15-20 Lektionen) Miniprojekt

### ⏳ Async/Await & Tokio
31. ⬇️ **Paralleler Datei-Downloader** (15-20 Lektionen) Miniprojekt
32. ⏱️ **Async-Timer-Kaskade** (15-20 Lektionen) Miniprojekt
33. 🌐 **Async-HTTP-Client-Batch** (15-20 Lektionen) Miniprojekt
34. 📬 **Async-Task-Queue** (15-20 Lektionen) Miniprojekt
35. 🧮 **Async-Berechnungspipeline** (15-20 Lektionen) Miniprojekt
36. 🗃️ **Async-Datei-Batch-Verarbeitung** (15-20 Lektionen) Miniprojekt
37. ⏳ **Timeout-Handling mit Tokio** (15-20 Lektionen) Miniprojekt
38. 🌦️ **Async-Wetter-Aggregator** (15-20 Lektionen) Miniprojekt

### 🔀 Concurrency (`Arc<Mutex<T>>`, Channels)
39. 💬 **Chat-Server (TCP)** (15-20 Lektionen) Miniprojekt
40. 📈 **Metrics-Aggregator-Service** (15-20 Lektionen) Miniprojekt
41. 🧵 **Geteilter Zähler (threadsicher)** (15-20 Lektionen) Miniprojekt
42. 🏭 **Producer-Consumer-Pipeline** (15-20 Lektionen) Miniprojekt
43. 🗳️ **Paralleler Abstimmungs-Zähler** (15-20 Lektionen) Miniprojekt
44. 🌐 **Verteilter Cache (simuliert)** (15-20 Lektionen) Miniprojekt
45. 🧮 **Paralleler Datenaggregator** (15-20 Lektionen) Miniprojekt
46. 🚦 **Worker-Pool mit Channels** (15-20 Lektionen) Miniprojekt

### 🌐 REST API, DB & Docker
47. 🌐 **REST-API Todo-Service** (15-20 Lektionen) Miniprojekt
48. 📚 **Bibliotheks-API** (15-20 Lektionen) Miniprojekt
49. 🧾 **Rechnungs-API** (15-20 Lektionen) Miniprojekt
50. 🎮 **Highscore-API** (15-20 Lektionen) Miniprojekt
51. 🗳️ **Umfrage-API** (15-20 Lektionen) Miniprojekt
52. 🧑‍🤝‍🧑 **Nutzerverwaltungs-API** (15-20 Lektionen) Miniprojekt
53. 📦 **Lagerbestand-API** (15-20 Lektionen) Miniprojekt
54. 🌦️ **Wetter-Cache-API** (15-20 Lektionen) Miniprojekt

### 🔒 Security-Grundlagen
55. 🔐 **Sicherer Passwort-Manager (CLI)** (15-20 Lektionen) Miniprojekt
56. 🧼 **Eingabe-Validierungs-Bibliothek** (15-20 Lektionen) Miniprojekt
57. 🗝️ **Secrets-Loader** (15-20 Lektionen) Miniprojekt
58. 🧯 **Sensible-Daten-Logger-Filter** (15-20 Lektionen) Miniprojekt
59. 🔒 **Verschlüsselter Notiz-Tresor** (15-20 Lektionen) Miniprojekt
60. 🧾 **API-Key-Verwaltung** (15-20 Lektionen) Miniprojekt
61. 🧪 **Fuzz-artige Eingabe-Härtungstests** (15-20 Lektionen) Miniprojekt

### 🧩 Kombinierte Profi-Projekte
62. 🌦️ **Produktionsreifes Wetter-CLI** (15-20 Lektionen) Miniprojekt
63. 🌐 **Containerisierter Todo-Service** (15-20 Lektionen) Miniprojekt
64. 🔐 **Sicherer Multi-User-Passwort-Tresor-Server** (15-20 Lektionen) Miniprojekt
65. 💬 **Instrumentierter Chat-Server** (15-20 Lektionen) Miniprojekt
66. 📈 **Metrics-Service mit DB-Persistenz** (15-20 Lektionen) Miniprojekt
67. ⬇️ **Download-Manager mit CLI & Tracing** (15-20 Lektionen) Miniprojekt
68. 🧾 **Rechnungs-Microservice** (15-20 Lektionen) Miniprojekt
69. 🌐 **API-Gateway (vereinfacht)** (15-20 Lektionen) Miniprojekt
70. 🔒 **Security-gehärtete Config-API** (15-20 Lektionen) Miniprojekt
71. 📊 **Verteiltes Aggregations-System** (15-20 Lektionen) Miniprojekt
72. 🧮 **Batch-Import-Service** (15-20 Lektionen) Miniprojekt
73. 🎮 **Highscore-Plattform komplett** (15-20 Lektionen) Miniprojekt
74. 🗳️ **Abstimmungs-Plattform** (15-20 Lektionen) Miniprojekt
75. 🌦️ **Multi-Quellen-Wetteraggregator-Service** (15-20 Lektionen) Miniprojekt
76. 📦 **Bestellsystem-Backend** (15-20 Lektionen) Miniprojekt
77. 🔐 **Auth-Service (Lernprojekt)** (15-20 Lektionen) Miniprojekt
78. 🧾 **Abo-Verwaltungs-API** (15-20 Lektionen) Miniprojekt
79. 🌐 **Health-Check-Aggregator** (15-20 Lektionen) Miniprojekt
80. 🧑‍🤝‍🧑 **Team-Kollaborationstool (Backend)** (15-20 Lektionen) Miniprojekt

### 🔁 Erweiterte Praxisprojekte
81. 🌦️ **Wetter-Alarm-Dienst** (15-20 Lektionen) Miniprojekt
82. 📬 **E-Mail-Warteschlangen-Simulator** (15-20 Lektionen) Miniprojekt
83. 🧮 **Verteilter Taschenrechner-Service** (15-20 Lektionen) Miniprojekt
84. 🗃️ **Datei-Sync-Tool (CLI)** (15-20 Lektionen) Miniprojekt
85. 🎫 **Ticket-System-Backend** (15-20 Lektionen) Miniprojekt
86. 🧾 **Abrechnungs-Batch-Job** (15-20 Lektionen) Miniprojekt
87. 🔒 **Rate-Limiter-Middleware** (15-20 Lektionen) Miniprojekt
88. 🌐 **Reverse-Proxy (vereinfacht)** (15-20 Lektionen) Miniprojekt
89. 📊 **Dashboard-Backend** (15-20 Lektionen) Miniprojekt
90. 🧩 **Feature-Flag-Service** (15-20 Lektionen) Miniprojekt
91. 🔐 **Passwort-Rotation-Reminder** (15-20 Lektionen) Miniprojekt
92. 🧵 **Paralleler Datei-Hasher** (15-20 Lektionen) Miniprojekt
93. 🌦️ **Wetterstation-Datensammler** (15-20 Lektionen) Miniprojekt
94. 📦 **Inventar-Sync-Service** (15-20 Lektionen) Miniprojekt
95. 🧾 **Mahnwesen-Automatisierung** (15-20 Lektionen) Miniprojekt
96. 🔒 **Geheimnis-Rotations-CLI** (15-20 Lektionen) Miniprojekt
97. 🌐 **Webhook-Empfänger** (15-20 Lektionen) Miniprojekt
98. 🧮 **Batch-Preisrechner-Service** (15-20 Lektionen) Miniprojekt
99. 📈 **SLA-Monitoring-Tool** (15-20 Lektionen) Miniprojekt
100. 🔐 **Zero-Trust-Config-Validator** (15-20 Lektionen) Miniprojekt
101. 🧾 **Multi-Mandanten-Rechnungs-API** (15-20 Lektionen) Miniprojekt
102. 🌦️ **Resilientes Wetter-Gateway** (15-20 Lektionen) Miniprojekt

### 💼 Praxisnahe Business- & Firmenprojekte
103. 👥 **HR-Datenservice (Backend)** (15-20 Lektionen) Miniprojekt
104. 📦 **Bestandsverwaltungs-Backend** (15-20 Lektionen) Miniprojekt
105. 🛒 **Bestellabwicklungs-Service** (15-20 Lektionen) Miniprojekt
106. 📧 **Benachrichtigungs-Gateway (E-Mail/SMS abstrahiert)** (15-20 Lektionen) Miniprojekt
107. 📜 **Audit-Log-Service** (15-20 Lektionen) Miniprojekt
108. 🔐 **Auth- & Session-Service** (15-20 Lektionen) Miniprojekt
109. 🚪 **API-Gateway mit Rate-Limiting** (15-20 Lektionen) Miniprojekt
110. 🗂️ **Hintergrund-Job-Queue-Prozessor** (15-20 Lektionen) Miniprojekt
111. 🔄 **ETL-Pipeline für Geschäftsdaten** (15-20 Lektionen) Miniprojekt
112. 📈 **Monitoring- & Alerting-Service** (15-20 Lektionen) Miniprojekt
113. 🚩 **Feature-Flag-Service (Backend)** (15-20 Lektionen) Miniprojekt
114. 🔗 **Webhook-Zustell-Service** (15-20 Lektionen) Miniprojekt
115. 💳 **Zahlungs-Webhook-Handler (simuliert)** (15-20 Lektionen) Miniprojekt
116. 🧑‍💼 **CRM-Backend** (15-20 Lektionen) Miniprojekt
117. 🎫 **Ticketing-System-Backend** (15-20 Lektionen) Miniprojekt
118. ⚙️ **Config-Management-Service** (15-20 Lektionen) Miniprojekt
119. 🔑 **Secrets-Rotations-Service** (15-20 Lektionen) Miniprojekt
120. 🛡️ **Compliance-Scan-Service** (15-20 Lektionen) Miniprojekt
