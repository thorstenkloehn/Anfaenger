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
1. 🌦️ **CLI-Wetter-Tool**
2. 🧾 **Rechnungs-Validator**
3. 📦 **Bestellsystem-Fehlerkette**
4. 🧮 **Config-Parser mit Fehlerkontext**
5. 🔌 **Plugin-Loader mit Fehlerbehandlung**
6. 🗄️ **Datei-Import-Pipeline**
7. 🌐 **HTTP-Client-Wrapper**
8. 🧪 **Fehler-Testsuite**

### ⚙️ Config & Serialisierung (serde)
9. 📋 **Multi-Format-Config-Loader**
10. 🗃️ **Kontakt-Export/Import**
11. 🎮 **Spielstand-Speicherung**
12. 🌐 **API-Response-Mapper**
13. 🧾 **Rechnungsvorlagen als YAML**
14. 🔄 **Schema-Migrations-Tool**
15. 📊 **CSV-zu-JSON-Konverter**
16. 🧩 **Custom-Serialize-Implementierung**

### 🖥️ CLI (clap)
17. 🌦️ **Wetter-CLI mit Subcommands**
18. 🗂️ **Datei-Organizer-CLI**
19. 🧮 **Rechner-CLI mit Flags**
20. 📋 **To-Do-CLI**
21. 🔍 **Grep-Klon (einfach)**
22. 📦 **Backup-CLI**
23. 🌐 **API-Client-CLI**
24. 🧾 **Rechnungs-Generator-CLI**

### 📝 Tracing
25. 🌦️ **Instrumentiertes Wetter-Tool**
26. 🔍 **Request-Verfolgung (simuliert)**
27. 🧵 **Nebenläufige Aufgaben mit Tracing**
28. 📊 **Strukturierte Log-Pipeline**
29. 🧯 **Fehler-Tracing**
30. 🌐 **Instrumentierter HTTP-Client**

### ⏳ Async/Await & Tokio
31. ⬇️ **Paralleler Datei-Downloader**
32. ⏱️ **Async-Timer-Kaskade**
33. 🌐 **Async-HTTP-Client-Batch**
34. 📬 **Async-Task-Queue**
35. 🧮 **Async-Berechnungspipeline**
36. 🗃️ **Async-Datei-Batch-Verarbeitung**
37. ⏳ **Timeout-Handling mit Tokio**
38. 🌦️ **Async-Wetter-Aggregator**

### 🔀 Concurrency (`Arc<Mutex<T>>`, Channels)
39. 💬 **Chat-Server (TCP)**
40. 📈 **Metrics-Aggregator-Service**
41. 🧵 **Geteilter Zähler (threadsicher)**
42. 🏭 **Producer-Consumer-Pipeline**
43. 🗳️ **Paralleler Abstimmungs-Zähler**
44. 🌐 **Verteilter Cache (simuliert)**
45. 🧮 **Paralleler Datenaggregator**
46. 🚦 **Worker-Pool mit Channels**

### 🌐 REST API, DB & Docker
47. 🌐 **REST-API Todo-Service**
48. 📚 **Bibliotheks-API**
49. 🧾 **Rechnungs-API**
50. 🎮 **Highscore-API**
51. 🗳️ **Umfrage-API**
52. 🧑‍🤝‍🧑 **Nutzerverwaltungs-API**
53. 📦 **Lagerbestand-API**
54. 🌦️ **Wetter-Cache-API**

### 🔒 Security-Grundlagen
55. 🔐 **Sicherer Passwort-Manager (CLI)**
56. 🧼 **Eingabe-Validierungs-Bibliothek**
57. 🗝️ **Secrets-Loader**
58. 🧯 **Sensible-Daten-Logger-Filter**
59. 🔒 **Verschlüsselter Notiz-Tresor**
60. 🧾 **API-Key-Verwaltung**
61. 🧪 **Fuzz-artige Eingabe-Härtungstests**

### 🧩 Kombinierte Profi-Projekte
62. 🌦️ **Produktionsreifes Wetter-CLI**
63. 🌐 **Containerisierter Todo-Service**
64. 🔐 **Sicherer Multi-User-Passwort-Tresor-Server**
65. 💬 **Instrumentierter Chat-Server**
66. 📈 **Metrics-Service mit DB-Persistenz**
67. ⬇️ **Download-Manager mit CLI & Tracing**
68. 🧾 **Rechnungs-Microservice**
69. 🌐 **API-Gateway (vereinfacht)**
70. 🔒 **Security-gehärtete Config-API**
71. 📊 **Verteiltes Aggregations-System**
72. 🧮 **Batch-Import-Service**
73. 🎮 **Highscore-Plattform komplett**
74. 🗳️ **Abstimmungs-Plattform**
75. 🌦️ **Multi-Quellen-Wetteraggregator-Service**
76. 📦 **Bestellsystem-Backend**
77. 🔐 **Auth-Service (Lernprojekt)**
78. 🧾 **Abo-Verwaltungs-API**
79. 🌐 **Health-Check-Aggregator**
80. 🧑‍🤝‍🧑 **Team-Kollaborationstool (Backend)**

### 🔁 Erweiterte Praxisprojekte
81. 🌦️ **Wetter-Alarm-Dienst**
82. 📬 **E-Mail-Warteschlangen-Simulator**
83. 🧮 **Verteilter Taschenrechner-Service**
84. 🗃️ **Datei-Sync-Tool (CLI)**
85. 🎫 **Ticket-System-Backend**
86. 🧾 **Abrechnungs-Batch-Job**
87. 🔒 **Rate-Limiter-Middleware**
88. 🌐 **Reverse-Proxy (vereinfacht)**
89. 📊 **Dashboard-Backend**
90. 🧩 **Feature-Flag-Service**
91. 🔐 **Passwort-Rotation-Reminder**
92. 🧵 **Paralleler Datei-Hasher**
93. 🌦️ **Wetterstation-Datensammler**
94. 📦 **Inventar-Sync-Service**
95. 🧾 **Mahnwesen-Automatisierung**
96. 🔒 **Geheimnis-Rotations-CLI**
97. 🌐 **Webhook-Empfänger**
98. 🧮 **Batch-Preisrechner-Service**
99. 📈 **SLA-Monitoring-Tool**
100. 🔐 **Zero-Trust-Config-Validator**
101. 🧾 **Multi-Mandanten-Rechnungs-API**
102. 🌦️ **Resilientes Wetter-Gateway**

### 💼 Praxisnahe Business- & Firmenprojekte
103. 👥 **HR-Datenservice (Backend)**
104. 📦 **Bestandsverwaltungs-Backend**
105. 🛒 **Bestellabwicklungs-Service**
106. 📧 **Benachrichtigungs-Gateway (E-Mail/SMS abstrahiert)**
107. 📜 **Audit-Log-Service**
108. 🔐 **Auth- & Session-Service**
109. 🚪 **API-Gateway mit Rate-Limiting**
110. 🗂️ **Hintergrund-Job-Queue-Prozessor**
111. 🔄 **ETL-Pipeline für Geschäftsdaten**
112. 📈 **Monitoring- & Alerting-Service**
113. 🚩 **Feature-Flag-Service (Backend)**
114. 🔗 **Webhook-Zustell-Service**
115. 💳 **Zahlungs-Webhook-Handler (simuliert)**
116. 🧑‍💼 **CRM-Backend**
117. 🎫 **Ticketing-System-Backend**
118. ⚙️ **Config-Management-Service**
119. 🔑 **Secrets-Rotations-Service**
120. 🛡️ **Compliance-Scan-Service**
