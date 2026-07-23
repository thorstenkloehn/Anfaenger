# 🌉 Best of Both Worlds: Vom Wissenssystem zum Enterprise CMS

Du hast in den 5 Stufen gelernt, wie du ein persönliches, hochperformantes Wissenssystem mit CLI, Web-Interface, Zettelkasten und KI-Anbindung baust. Doch was passiert, wenn dein System nicht mehr nur für dich persönlich gedacht ist, sondern in einem **Unternehmen, einem Verein oder für Kundenseiten** eingesetzt werden soll?

In diesem Kapitel schlagen wir die Brücke: Wir verbinden die Stärken deines Wissenssystems (Graphen, KI, Markdown/MediaWiki) mit den wichtigsten **Enterprise CMS-Features** (MeinCMS-Architektur).

---

## 🚀 Einleitung & Vision: Der fließende Übergang

Ein reines Wissenssystem ist perfekt für Entwickler. Ein **Enterprise CMS (Content Management System)** ergänzt dieses System um Sicherheits- und Verwaltungs-Funktionen, die für den Mehrbenutzer-Betrieb im Web unverzichtbar sind:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                       BEST OF BOTH WORLDS ARCHITEKTUR                       │
│                                                                             │
│  [ Deines Wissenssystem ]  ──►  [ Enterprise CMS-Erweiterung ]             │
│  • Zettelkasten & Links         • Argon2id Admin-Authentifizierung          │
│  • Markdown / Wikitext          • Multi-Tenancy (Mandantenfähigkeit)       │
│  • Axum Web-Server              • Sichere Medien- & Bild-Uploads            │
│  • KI-RAG-Bibliothekar          • Backup & Repair CLI (70% Ersparnis)       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🧠 Die Bildmetapher: Die Stadtbibliothek mit Verwaltungsflügel

Stell dir dein erweitertes System wie eine große **Stadtbibliothek mit neuem Verwaltungsflügel** vor:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                      DIE ARCHITEKTUR DER STADTBIBLIOTHEK                    │
│                                                                             │
│  [ Lesesaal (Wissenssystem) ]   ◄───►   [ Verwaltungsflügel (CMS) ]         │
│  • Leser stöbern in Büchern             • Der Pförtner prüft Dienstausweise │
│  • Zettelkasten-Verknüpfungen           • Der Tresor sichert Passwörter     │
│  • KI-Bibliothekar gibt Auskunft        • Das Fotoarchiv verwaltet Bilder   │
└─────────────────────────────────────────────────────────────────────────────┘
```

1. **Der Lesesaal (Wissenssystem):** Hier stöbern Leser öffentlich durch Artikel, nutzen Querverweise und stellen Fragen an den KI-Bibliothekar.
2. **Der Pförtner (`AdminAuth` & RBAC):** Kontrolliert, wer Artikel bearbeiten oder neue Seiten anlegen darf.
3. **Der Passwort-Tresor (`Argon2id`):** Speichert Admin-Zugänge extrem sicher gegen Hackerangriffe.
4. **Das Auslieferungslager (Multi-Tenancy):** Bedient über dasselbe Gebäude verschiedene Abteilungen (`docs.bibliothek.de` vs. `wiki.bibliothek.de`).

---

## 🏗️ Die 4 Enterprise CMS-Module im Detail

### 1. Authentifizierung & Admin-Schutz (`wiki_admin`)
Um unbefugtes Bearbeiten zu verhindern, schützen wir Schreib-Routen (`POST /wiki/:slug`) mit einem **Rollenbasierten Zugriffsschutz (RBAC)** und **Argon2id-Passworthashing**.

### 2. Mandantenfähigkeit (Multi-Tenancy)
Ein einziger Rust-Server bedient mehrere Domains/Mandanten gleichzeitig:
- `main.wissen.de` -> Haupt-Wiki
- `doc.wissen.de` -> Entwickler-Dokumentation
Der Hostname im HTTP-Header bestimmt automatisch, welche Artikel-Datenbank geladen wird.

### 3. Sichere Medien- & Upload-Verwaltung
Benutzer möchten Bilder und Diagramme hochladen. Rust sorgt für Sicherheit:
- **MIME-Type Validation:** Prüft, ob es sich wirklich um ein PNG/JPEG handelt (Schutz vor Malicious Script Uploads).
- **Dateigrößen-Limit:** Verhindert Denial-of-Service-Angriffe durch riesige Uploads.

### 4. Der Backup & Repair Mechanismus (`wiki_backup`)
Das **MeinCMS-Erfolgsgeheimnis**:
- Speichere im Backup **nur die Markdown/Wikitext-Quelldateien** (YAML/JSON-Export).
- Das spart **70 % Speicherplatz**, da kein aufgeblähtes HTML gesichert wird.
- Bei einem Import regeneriert der Befehl `cargo run -- repair` alle HTML-Seiten automatisch frisch.

---

## ⚙️ Code-Gerüst zum Selberbauen

Hier ist das Architektur-Gerüst für dein Enterprise-CMS-Modul. Ergänze die Lücken überall dort, wo `todo!()` steht!

```rust
use axum::{
    extract::{FromRequestParts, State},
    http::{request::Parts, StatusCode},
    response::IntoResponse,
};
use std::sync::Arc;

// 1. Benutzer- & Rollenstruktur
#[derive(Debug, Clone, PartialEq)]
pub enum UserRole {
    Reader,
    Editor,
    Admin,
}

#[derive(Debug, Clone)]
pub struct User {
    pub username: String,
    pub password_hash: String,
    pub role: UserRole,
}

// 2. Argon2 Passwort-Hashing (Konzept-Gerüst)
pub struct AuthManager;

impl AuthManager {
    /// Hasht ein Klartext-Passwort mit Argon2id
    pub fn hash_password(password: &str) -> Result<String, String> {
        // TODO: Nutze die argon2-Crate für sicheres Hashing
        todo!("Implementiere Argon2id Password Hashing")
    }

    /// Verifiziert ein Passwort gegen einen gespeicherten Hash
    pub fn verify_password(password: &str, hash: &str) -> bool {
        // TODO: Vergleiche das Passwort mit dem Argon2-Hash
        todo!("Implementiere Passwort-Verifikation")
    }
}

// 3. Axum Auth-Middleware / Extractor für Admin-Schutz
pub struct RequireAdmin(pub User);

impl<S> FromRequestParts<S> for RequireAdmin
where
    S: Send + Sync,
{
    type Rejection = (StatusCode, &'static str);

    async fn from_request_parts(parts: &mut Parts, _state: &S) -> Result<Self, Self::Rejection> {
        // TODO: Extrahiere das Session-Cookie oder den Authorization-Header.
        // Prüfe, ob der Benutzer eingeloggt ist UND die Rolle UserRole::Admin besitzt.
        // Wenn nicht -> Gib Err((StatusCode::FORBIDDEN, "Zugriff verweigert!")) zurück.
        todo!("Implementiere die Axum Admin-Auth Middleware")
    }
}

// 4. Multi-Tenancy Hostname Extractor
pub struct TenantHost(pub String);

impl<S> FromRequestParts<S> for TenantHost
where
    S: Send + Sync,
{
    type Rejection = StatusCode;

    async fn from_request_parts(parts: &mut Parts, _state: &S) -> Result<Self, Self::Rejection> {
        // TODO: Lies den "Host"-Header aus den HTTP-Request-Parts aus (z. B. "docs.domain.de").
        todo!("Extrahiere den Mandanten-Hostnamen aus der Anfrage")
    }
}
```

💡 **Denkanstöße & Leitfragen:**
- **Sicherheits-Header:** Welche HTTP-Header (z. B. `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`) solltest du in der Axum-Response setzen, um das CMS gegen Clickjacking und MIME-Sniffing zu schützen?
- **Statische Dateien sperren:** Wie verhinderst du, dass Besucher sensible Dateien wie `config/users.json` oder `.env` über die URL aufrufen können? (HTTP `403 Forbidden`).

---

## 🧪 Übungsaufgaben

### 🟢 Leicht: Rollen-Prüfung erweitern
Erweitere die `RequireAdmin`-Middleware um eine `RequireEditor`-Struktur. Editoren dürfen Artikel erstellen und bearbeiten, aber keine neuen Benutzer anlegen oder löschen.

### 🟡 Mittel: Der 70%-Speicher-Backup-Exporter
Schreibe eine CLI-Funktion `export_yaml_backup(articles: &[Article]) -> String`.
- Wandle alle Artikel in ein YAML-Dokument um, das **nur Slug, Titel und Quelltext (Markdown)** speichert.
- Miss den Unterschied im Speicherbedarf zwischen YAML-Rohdaten und fertig gerendertem HTML!

### 🔴 Schwer: Sichere Bild-Upload-Route
Baue einen Axum-Handler `POST /api/upload`, der Multipart-Formdaten entgegennimmt:
- Prüfe die ersten Bytes der Datei (Magic Bytes) auf ein valides PNG (`89 50 4E 47`) oder JPEG-Format.
- Speichere das Bild mit einer zufälligen UUID als Dateiname im Ordner `/uploads` ab.

---

## 🎯 Zusammenfassung

Du besitzt nun das Beste aus beiden Welten (**Best of Both Worlds**):
- **Das Wissenssystem:** Schnelles Suchen, Vernetzen (Zettelkasten) und KI-RAG-Unterstützung.
- **Das Enterprise CMS:** Robuster Admin-Schutz (Argon2), Mandantenfähigkeit, Medien-Uploads und Backup/Repair-Prozesse.

Damit hast du das komplette Rüstzeug, um von kleinen Notiz-Apps bis hin zu hochperformanten Firmen-Portalen alles in Rust zu bauen! 🦀🚀
