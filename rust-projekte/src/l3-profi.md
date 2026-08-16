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

## 📜 60 Projektvorschläge

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

### 🗄️ Datenbank-Technik
25. 🌐 **REST-API mit echter DB-Anbindung (axum + sqlx)** (nur die wichtigsten 10 Themen)
26. 🖥️ **CLI für Datenbank-Migrationen (clap)** (nur die wichtigsten 10 Themen)
27. ⚙️ **Async-Connection-Pool-Management** (nur die wichtigsten 10 Themen)
28. 📝 **Tracing-instrumentierte Query-Ausführung** (nur die wichtigsten 10 Themen)
29. 🔐 **Sicherer DB-Zugriff (SQL-Injection-Schutz)** (nur die wichtigsten 10 Themen)
30. 🔀 **Concurrency-fähiger Batch-Insert-Service** (nur die wichtigsten 10 Themen)
31. ⚙️ **Config-gesteuerte DB-Verbindung (mehrere Umgebungen)** (nur die wichtigsten 10 Themen)
32. 🐳 **Docker-containerisierte DB mit Migrations-Pipeline** (nur die wichtigsten 10 Themen)
33. 🔀 **Read-Replica-Routing-Simulator** (nur die wichtigsten 10 Themen)
34. 💽 **Backup- & Restore-Service (automatisiert)** (nur die wichtigsten 10 Themen)
35. 🏢 **Multi-Tenant-DB-Schema-Verwaltung** (nur die wichtigsten 10 Themen)
36. 📈 **Query-Performance-Monitoring-Service** (nur die wichtigsten 10 Themen)

### 🧮 Eigene Parser & Compiler bauen
37. 🖥️ **CLI für eigene Skriptsprache (clap)** (nur die wichtigsten 10 Themen)
38. 🧠 **Interpreter für einfache Skriptsprache (Variablen, Kontrollfluss)** (nur die wichtigsten 10 Themen)
39. ⚙️ **Async-Dateicompiler-Pipeline (parallele Dateiverarbeitung)** (nur die wichtigsten 10 Themen)
40. 📝 **Tracing-instrumentierter Compiler-Durchlauf (Lexen→Parsen→Auswerten)** (nur die wichtigsten 10 Themen)
41. 🔒 **Sicherer Sandbox-Interpreter (begrenzte Ausführung)** (nur die wichtigsten 10 Themen)
42. 🔀 **Concurrency-fähiger Batch-Compiler** (nur die wichtigsten 10 Themen)
43. ⚙️ **Config-gesteuerte Compiler-Optionen (serde)** (nur die wichtigsten 10 Themen)
44. 🐳 **Docker-containerisierter Compiler-Service** (nur die wichtigsten 10 Themen)
45. 🌐 **REST-API für Code-Ausführung („Playground“-Backend)** (nur die wichtigsten 10 Themen)
46. 🔍 **Semantische Analyse-Phase (einfache Typprüfung)** (nur die wichtigsten 10 Themen)
47. 🩺 **Fehlerdiagnose-Service mit Quellcode-Kontext** (nur die wichtigsten 10 Themen)
48. ⚙️ **Bytecode-Generator (einfache VM-Instruktionen)** (nur die wichtigsten 10 Themen)

### 📰 CMS-Technik
49. ⚙️ **Async-Content-API (axum, CRUD für Artikel)** (nur die wichtigsten 10 Themen)
50. 🐳 **Docker-containerisiertes Mini-CMS** (nur die wichtigsten 10 Themen)
51. 🔐 **Rollen-basierte Zugriffskontrolle (Autor/Redakteur/Admin)** (nur die wichtigsten 10 Themen)
52. 📝 **Tracing-instrumentierter Publishing-Workflow** (nur die wichtigsten 10 Themen)
53. ⚙️ **Config-gesteuertes CMS (serde, verschiedene Backends)** (nur die wichtigsten 10 Themen)
54. 💓 **Health-Check-Endpoint für CMS-Service** (nur die wichtigsten 10 Themen)
55. 🔄 **Asynchroner Medien-Upload-Dienst (Bilder, Dateien)** (nur die wichtigsten 10 Themen)
56. 🚦 **Rate-Limiting für Kommentar-API** (nur die wichtigsten 10 Themen)
57. 📈 **Cache-Invalidierungs-Dienst (Redis-artig, simuliert)** (nur die wichtigsten 10 Themen)
58. 🔃 **Content-Synchronisation zwischen Staging/Produktion** (nur die wichtigsten 10 Themen)
59. 🔎 **Async-Volltextsuche-Service (Index im Hintergrund aktualisieren)** (nur die wichtigsten 10 Themen)
60. 🌐 **Webhook-System (Event bei Veröffentlichung auslösen)** (nur die wichtigsten 10 Themen)
