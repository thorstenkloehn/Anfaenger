# 🛠️ System-Setup für das Lernprojekt

Dieses Dokument beschreibt die vollständige Einrichtung der Entwicklungsumgebung, inklusive des mdBook-Systems und der Code-Execution-Engine Judge0.

---

## 📚 Teil 1: mdBook installieren

`mdBook` ist das Tool, mit dem dieses Rust-Buch generiert wird. Es liest die Markdown-Dateien im Ordner `src/` und erstellt daraus eine interaktive Webseite.

### 💻 Installationsschritte

Es gibt zwei Möglichkeiten, `mdBook` auf Ubuntu zu installieren:

#### Option A: Über Cargo (Empfohlen für Rust-Entwickler)
Da du Rust bereits installiert hast, kannst du `mdBook` ganz einfach über den Paketmanager Cargo kompilieren und installieren:
```bash
cargo install mdbook
```
*Hinweis: Dies kann einige Minuten dauern, da der Quellcode heruntergeladen und auf deinem System kompiliert wird.*

#### Option B: Über vorkompiliertes Binärpaket (Sehr schnell)
Wenn du nicht warten möchtest, kannst du die fertige ausführbare Datei direkt von GitHub herunterladen:
```bash
# Neueste Version herunterladen (z. B. v0.4.40)
wget https://github.com/rust-lang/mdBook/releases/download/v0.4.40/mdbook-v0.4.40-x86_64-unknown-linux-gnu.tar.gz

# Entpacken
tar -zxvf mdbook-v0.4.40-x86_64-unknown-linux-gnu.tar.gz

# In den Systempfad verschieben
sudo mv mdbook /usr/local/bin/

# Temporäre Datei löschen
rm mdbook-v0.4.40-x86_64-unknown-linux-gnu.tar.gz
```

### 🔍 Installation überprüfen
Teste, ob `mdBook` erfolgreich installiert wurde:
```bash
mdbook --version
```

### 🚀 Das Buch lokal starten
Um das Buch zu bauen und lokal im Browser zu betrachten:
```bash
cd rust-projekte
mdbook serve --open
```
Das Buch öffnet sich automatisch unter `http://localhost:3000`.

---

## ⚡ Teil 2: Judge0 Setup auf Ubuntu 24.04 LTS (und neuer)

Judge0 ist eine Code-Execution-Engine, die in Docker läuft. Auf modernen Linux-Systemen wie Ubuntu 24.04 LTS gibt es standardmäßig Inkompatibilitäten aufgrund von **cgroup v2**, während Judge0 zwingend **cgroup v1** voraussetzt.

### 🛠️ Installationsschritte

#### 1. Docker & Docker Compose installieren
```bash
sudo apt update
sudo apt install -y docker.io docker-compose-v2
```

#### 2. Judge0 CE (Community Edition) herunterladen
```bash
mkdir -p judge0 && cd judge0
wget https://github.com/judge0/judge0/releases/download/v1.13.1/judge0-v1.13.1.zip
unzip judge0-v1.13.1.zip
cd judge0-v1.13.1
```

#### 3. Konfiguration anpassen
Erstelle sichere Passwörter für Postgres und Redis in der Datei `judge0.conf`:
```ini
# In judge0.conf die folgenden Zeilen ausfüllen:
REDIS_PASSWORD=dein_sicheres_redis_passwort
POSTGRES_PASSWORD=dein_sicheres_postgres_passwort
```

#### 4. WICHTIG: cgroup-Kompatibilität einrichten (Ubuntu 24.04 / 26.04+ Fix)
Da Judge0 standardmäßig die veraltete cgroup v1-Hierarchie für das Sandboxing (`isolate`) voraussetzt, schlägt die Codeausführung auf modernen Linux-Systemen standardmäßig mit einem `Internal Error (status 13)` fehl.

Je nach Ubuntu-Version gibt es zwei Lösungswege:

##### Option A: Für Ubuntu 26.04 LTS (und neuer) sowie cgroup v2-only Systeme (Empfohlen)
Da ab systemd Version 258 (standardmäßig in Ubuntu 26.04+) cgroup v1 vollständig aus dem Betriebssystem entfernt wurde, kann es nicht mehr über Boot-Parameter reaktiviert werden. Die Lösung besteht darin, ein cgroup v2-kompatibles Docker-Image zu verwenden:

1. Passe deine `docker-compose.yml` an:
   * Verwende das Image `mrkushalsm/judge0:cgv2` für `server` und `workers`.
   * Füge `cgroup: host` zu beiden Services hinzu.
   * Mounte das cgroup-Verzeichnis `/sys/fs/cgroup:/sys/fs/cgroup:rw`.
   * Stelle sicher, dass `privileged: true` beim `workers`-Service gesetzt ist, da das Sandbox-Tool `isolate` erweiterte Kernel-Rechte benötigt.

   Beispielkonfiguration:
   ```yaml
   services:
     server:
       image: mrkushalsm/judge0:cgv2
       cgroup: host
       volumes:
         - ./judge0.conf:/judge0.conf:ro
         - /sys/fs/cgroup:/sys/fs/cgroup:rw
       ...
     workers:
       image: mrkushalsm/judge0:cgv2
       privileged: true
       cgroup: host
       volumes:
         - ./judge0.conf:/judge0.conf:ro
         - /sys/fs/cgroup:/sys/fs/cgroup:rw
       ...
   ```

##### Option B: Für Ubuntu 24.04 LTS (cgroup v1 aktivieren)
Hier kann das System noch gezwungen werden, die alte cgroup v1-Hierarchie zu nutzen:
1. Bearbeite die GRUB-Konfiguration:
   ```bash
   sudo nano /etc/default/grub
   ```
2. Füge den Parameter `systemd.unified_cgroup_hierarchy=0 SYSTEMD_CGROUP_ENABLE_LEGACY_FORCE=1` an die Zeile `GRUB_CMDLINE_LINUX_DEFAULT` an.
3. Aktualisiere GRUB und starte das System neu:
   ```bash
   sudo update-grub
   sudo reboot
   ```

#### 5. Judge0 starten
```bash
sudo docker compose up -d
```

---

## 🧪 Judge0 testen (Code-Ausführung verifizieren)

Um zu testen, ob Judge0 ordnungsgemäß funktioniert, kannst du eine API-Anfrage (POST) an den Server senden.

### Wichtig für den Test:
Wegen Shell-Escaping bei Anführungszeichen (`\"`) unter Linux/Bash kann es bei Direktübergabe von Python-Code zu Syntax-Fehlern (`SyntaxError: Non-UTF-8 code starting with '\xa6'`) kommen. Es wird dringend empfohlen, den Code **Base64-kodiert** zu senden.

#### Test-Befehl (Python 3 Hello-World - Base64 kodiert):
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"source_code": "cHJpbnQoIkhlbGxvIFdvcmxkIik=", "language_id": 71, "base64_encoded": true}' \
  "http://localhost:2358/submissions?wait=true"
```

### Mögliche Ergebnisse:

#### ❌ Fehlgeschlagener Test (cgroup-Konfigurationsfehler):
```json
{
  "stdout": null,
  "time": null,
  "memory": null,
  "stderr": "...",
  "token": "...",
  "compile_output": null,
  "message": "Cannot set /sys/fs/cgroup/...",
  "status": {
    "id": 13,
    "description": "Internal Error"
  }
}
```
*Wenn du diesen Fehler erhältst, stelle sicher, dass du Schritt 4 (Option A oder Option B) korrekt durchgeführt hast und die Cgroup-Mounts/Rechte passen.*

####  Erfolgreicher Test:
```json
{
  "stdout": "SGVsbG8gV29ybGQK\n",
  "time": "0.011",
  "memory": 3304,
  "stderr": null,
  "token": "30a26b83-8d5e-4c79-8258-4240e57b5bf7",
  "compile_output": null,
  "message": null,
  "status": {
    "id": 3,
    "description": "Accepted"
  }
}
```

---

## 📇 Teil 3: Anki installieren (Lernkartei-System)

Anki ist ein kostenloses Karteikarten-Programm, das auf dem Prinzip der Spaced Repetition (abgestufte Wiederholung) basiert. Es hilft dir dabei, Vokabeln, Programmierkonzepte oder Syntax-Details langfristig im Gedächtnis zu behalten.

### 💻 Installationsschritte auf Ubuntu

Es gibt zwei einfache Wege, Anki unter Ubuntu zu installieren:

#### Option A: Über Flatpak (Empfohlen für die neueste Version)
Flatpak liefert immer die aktuellste Version von Anki inklusive aller benötigten Abhängigkeiten.

1. Installiere Flatpak und füge das Flathub-Repository hinzu:
   ```bash
   sudo apt update
   sudo apt install -y flatpak
   sudo flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo
   ```
2. Installiere Anki:
   ```bash
   flatpak install flathub net.ankiweb.Anki -y
   ```
3. Starte Anki über dein Anwendungsmenü oder das Terminal:
   ```bash
   flatpak run net.ankiweb.Anki &
   ```

#### Option B: Über die Ubuntu-Paketquellen (Schnell, aber oft ältere Version)
Dies ist der direkteste Weg über das Standard-System, allerdings sind die Versionen in den Paketquellen meist älter.

1. Installiere Anki mit apt:
   ```bash
   sudo apt update
   sudo apt install -y anki
   ```
2. Starte Anki über dein Anwendungsmenü oder durch Eingabe von `anki` im Terminal.

---

### 📂 Rust-Lernkarten importieren (Optional)

Wenn im Projektverzeichnis eine Datei namens `rust_anki_karten.csv` existiert, kannst du diese direkt in Anki importieren:

1. Öffne **Anki**.
2. Klicke unten auf **Datei importieren** (Import File).
3. Wähle die Datei `rust_anki_karten.csv` aus.
4. Stelle sicher, dass das Trennzeichen auf **Komma** eingestellt ist, und importiere die Karten in einen neuen Stapel (z. B. "Rust-Grundlagen").