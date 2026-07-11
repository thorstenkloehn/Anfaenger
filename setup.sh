#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "===================================================="
echo "🚀 Starte das automatische System-Setup..."
echo "===================================================="

# Helper function to print headers
print_step() {
    echo -e "\n\n🟢 STEP: $1"
    echo "----------------------------------------------------"
}

# Ask for sudo at the beginning
echo "Dieses Skript benötigt Root-Rechte für die Installation von Paketen (Apt, Docker, Flatpak)."
sudo -v

# Keep sudo alive
while true; do sudo -n true; sleep 60; kill -0 "$$" || exit; done 2>/dev/null &

# ==========================================
# STEP 1: mdBook installieren
# ==========================================
print_step "mdBook installieren"

if command -v mdbook &>/dev/null; then
    echo "mdBook ist bereits installiert: $(mdbook --version)"
else
    echo "Lade vorkompiliertes mdBook-Binärpaket (v0.4.40) herunter..."
    wget -q --show-progress https://github.com/rust-lang/mdBook/releases/download/v0.4.40/mdbook-v0.4.40-x86_64-unknown-linux-gnu.tar.gz
    
    echo "Entpacke mdBook..."
    tar -zxvf mdbook-v0.4.40-x86_64-unknown-linux-gnu.tar.gz
    
    echo "Verschiebe mdBook nach /usr/local/bin/..."
    sudo mv mdbook /usr/local/bin/
    
    echo "Bereinige temporäre Dateien..."
    rm mdbook-v0.4.40-x86_64-unknown-linux-gnu.tar.gz
    
    echo "mdBook erfolgreich installiert: $(mdbook --version)"
fi

# ==========================================
# STEP 2: Docker & Docker Compose installieren
# ==========================================
print_step "Docker & Docker Compose v2 installieren"

echo "Aktualisiere Paketquellen..."
sudo apt update -y

echo "Installiere Docker und Docker Compose v2..."
sudo apt install -y docker.io docker-compose-v2 unzip wget

# ==========================================
# STEP 3: Flatpak & Anki installieren
# ==========================================
print_step "Flatpak & Anki installieren"

if command -v flatpak &>/dev/null; then
    echo "Flatpak ist bereits installiert."
else
    echo "Installiere Flatpak..."
    sudo apt install -y flatpak
fi

echo "Füge Flathub-Repository hinzu..."
sudo flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo

echo "Installiere Anki über Flatpak (kann einen Moment dauern)..."
sudo flatpak install flathub net.ankiweb.Anki -y

# ==========================================
# STEP 4: Judge0 Setup & cgroup v2 Konfiguration
# ==========================================
print_step "Judge0 Setup & cgroup v2 Konfiguration"

JUDGE0_DIR="judge0"
mkdir -p "$JUDGE0_DIR"
cd "$JUDGE0_DIR"

if [ -d "judge0-v1.13.1" ]; then
    echo "Judge0-Verzeichnis existiert bereits. Überspringe Download..."
    cd judge0-v1.13.1
else
    echo "Lade Judge0 CE v1.13.1 herunter..."
    wget -q --show-progress https://github.com/judge0/judge0/releases/download/v1.13.1/judge0-v1.13.1.zip
    
    echo "Entpacke Judge0..."
    unzip -q judge0-v1.13.1.zip
    rm judge0-v1.13.1.zip
    cd judge0-v1.13.1
fi

echo "Generiere sichere Passwörter für Postgres und Redis in judge0.conf..."
redis_pass=$(openssl rand -hex 16 2>/dev/null || python3 -c 'import secrets; print(secrets.token_hex(16))')
postgres_pass=$(openssl rand -hex 16 2>/dev/null || python3 -c 'import secrets; print(secrets.token_hex(16))')

# Update passwords in judge0.conf
sed -i "s/REDIS_PASSWORD=.*/REDIS_PASSWORD=$redis_pass/g" judge0.conf
sed -i "s/POSTGRES_PASSWORD=.*/POSTGRES_PASSWORD=$postgres_pass/g" judge0.conf

echo "Passe docker-compose.yml für cgroup v2 (Ubuntu 26.04) an..."
python3 - <<'EOF'
import re

with open("docker-compose.yml", "r") as f:
    lines = f.readlines()

new_lines = []
service = None

for line in lines:
    # Detect service
    if line.strip() == "server:":
        service = "server"
    elif line.strip() == "workers:":
        service = "workers"
    elif re.match(r'^\S', line): # non-indented line resets service
        if line.strip() not in ["services:", "version:"]:
            service = None

    # Replace image
    if service in ["server", "workers"] and "image: judge0/judge0:1.13.1" in line:
        line = line.replace("judge0/judge0:1.13.1", "mrkushalsm/judge0:cgv2")
        indent = re.match(r'^(\s*)', line).group(1)
        new_lines.append(line)
        new_lines.append(f"{indent}cgroup: host\n")
        continue

    # Add volume mount
    if service in ["server", "workers"] and "- ./judge0.conf:/judge0.conf:ro" in line:
        indent = re.match(r'^(\s*)', line).group(1)
        new_lines.append(line)
        new_lines.append(f"{indent}- /sys/fs/cgroup:/sys/fs/cgroup:rw\n")
        continue

    new_lines.append(line)

with open("docker-compose.yml", "w") as f:
    f.writelines(new_lines)
EOF

echo "Starte Judge0 in Docker..."
sudo docker compose up -d

# ==========================================
# STEP 5: Testen & Verifizieren
# ==========================================
print_step "Setup abgeschlossen! Teste Code-Ausführung in Judge0..."

echo "Warte 5 Sekunden, bis die Container vollständig gestartet sind..."
sleep 5

echo "Sende Testanfrage an Judge0 (Python 3 Hello World)..."
TEST_RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"source_code": "cHJpbnQoIkhlbGxvIFdvcmxkIik=", "language_id": 71, "base64_encoded": true}' \
  "http://localhost:2358/submissions?wait=true")

echo "Antwort von Judge0:"
echo "$TEST_RESPONSE"

if echo "$TEST_RESPONSE" | grep -q '"description":"Accepted"'; then
    echo -e "\n🎉 ERFOLG: Judge0 führt Code korrekt aus!"
else
    echo -e "\n❌ FEHLER: Der Test von Judge0 ist fehlgeschlagen oder unvollständig. Bitte prüfe die Docker-Logs: 'docker compose logs'"
fi

echo -e "\n===================================================="
echo "🎯 Alles erledigt!"
echo "- mdBook ist einsatzbereit ('mdbook serve' im Ordner 'rust-projekte')."
echo "- Judge0 läuft im Hintergrund in Docker auf Port 2358."
echo "- Anki wurde über Flatpak installiert."
echo "  Starte Anki über dein Anwendungsmenü oder mit:"
echo "  flatpak run net.ankiweb.Anki &"
echo "===================================================="
